/**
 * Exam item HTML → speech chunks for the Web Speech API.
 *
 * Pipeline
 *   1. DOM walk: blocks → pauses, <b>/<strong>/<u> → emphasis, <sub>/<sup> → markers,
 *      MathML / KaTeX / MathJax / <img alt> / tables handled structurally,
 *      data-speech="…" lets authors override any element.
 *   2. Text passes on the flat string (each pass skips already-final speech):
 *      unicode cleanup → inline LaTeX → chemistry → units/degrees/currency →
 *      remaining sup/sub → fractions → operators & symbols → exam conventions.
 *   3. Split into chunks at pauses and emphasis boundaries.
 *
 * Framework-free: works in Angular, a web worker with a DOM shim, or Node (tests).
 */
import {
  BREAK, EM_C, EM_O, LANG_C, LANG_O, LANG_SEP, PROT_C, PROT_O, S_CLOSE, SUB_O, SUP_O, U_C, U_O, outsideProtected, protect,
} from './markers';
import {
  ABBREVIATIONS, ACCOUNTING_ABBREVIATIONS, ACCOUNTING_CONTEXT, ASCII_OPERATORS, CURRENCY, ELEMENT_NAMES,
  ELEMENT_SYMBOLS_BY_Z, EMPHASIS_WORDS, GENETICS_CONTEXT, GREEK, IPA_NAMES, IPA_SPECIFIC, LANGUAGE_HINTS, RATIO_CONTEXT,
  ROMAN, SOUND_CONTEXT, STRESS_CONTEXT, SUBSCRIPT_CHARS, SUPERSCRIPT_CHARS, SYMBOLS, UNICODE_FRACTIONS, UNITS,
} from './lexicon';
import { chemistryStep, mhchemToMarked } from './chemistry';
import { latexToSpeech } from './latex';
import { mathmlToSpeech } from './mathml';
import {
  accounting, coordinates, detectSubjects, genetics, nuclear, numberBases, phonetics, ratios, speakCode,
  stressedSyllables, underlines,
} from './subjects';

export interface SpeechChunk {
  text: string;
  /** Spoken with emphasis prosody (bold/underlined text, NOT/EXCEPT …). */
  emphasis?: boolean;
  /** Extra silence after this chunk, in ms. */
  pauseAfterMs?: number;
  /** BCP-47 language of this chunk when it is not English (from lang="…" or auto-detected). */
  lang?: string;
}

export interface NormalizeOptions {
  /** Which inline tags count as emphasis. Default: b, strong. (Italics are usually variables/species names.) */
  emphasisTags?: string[];
  /**
   * Underlined text. 'describe' (default) says what is underlined, which is what English
   * questions test: "book, with the letters o o underlined". 'emphasis' just stresses it.
   */
  underline?: 'describe' | 'emphasis';
  /** Tag Yoruba / Igbo / Hausa blocks by their distinctive letters when no lang attribute is present. */
  detectLanguages?: boolean;
  /** Upper-case keywords that get emphasis. */
  emphasisWords?: string[];
  /** Map letters to spoken forms if your chosen voice mis-reads them, e.g. { A: 'ay', a: 'ay' }. */
  letterNames?: Record<string, string>;
  /** Treat $…$ as inline LaTeX. Off by default because "$5 and $10" is common in maths items. */
  dollarMath?: boolean;
  /** What to say for an image with no alt text. Empty string = say nothing. */
  imageFallback?: string;
  /** Pause after a block (paragraph, list item, table row). */
  blockPauseMs?: number;
}

const DEFAULTS: Required<NormalizeOptions> = {
  emphasisTags: ['b', 'strong'],
  underline: 'describe',
  detectLanguages: true,
  emphasisWords: EMPHASIS_WORDS,
  letterNames: {},
  dollarMath: false,
  imageFallback: 'There is an image here.',
  blockPauseMs: 250,
};

const BLOCK_TAGS = new Set([
  'p', 'div', 'section', 'article', 'header', 'footer', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'hr', 'tr', 'table', 'caption',
]);
const SKIP_TAGS = new Set(['style', 'noscript', 'template', 'head', 'meta', 'link', 'button', 'o:p', 'xml']);

type Opts = Required<NormalizeOptions>;
type WalkCtx = { olIndex?: number[]; inLang?: boolean };

// ───────────────────────────────── 1. DOM walk ─────────────────────────────────

function parseHtml(html: string): Element {
  const Parser = (globalThis as { DOMParser?: typeof DOMParser }).DOMParser;
  if (!Parser) throw new Error('normalizeForSpeech needs DOMParser (browser, or a shim such as linkedom in tests)');
  const doc = new Parser().parseFromString(`<!doctype html><html><body>${html}</body></html>`, 'text/html');
  return doc.body;
}

function walk(node: Node, out: string[], o: Opts, ctx: WalkCtx = {}): void {
  if (node.nodeType === 3) {
    out.push(node.nodeValue ?? '');
    return;
  }
  if (node.nodeType !== 1) return;
  const el = node as Element;
  const tag = (el.localName || el.nodeName).toLowerCase();
  const attr = (n: string) => el.getAttribute(n);
  const cls = attr('class') ?? '';
  const children = () => el.childNodes.forEach((c) => walk(c, out, o, ctx));
  const latexOpts = { letterNames: o.letterNames, chem: (src: string) => speakChemSource(src, o) };

  // Author overrides & things screen readers skip
  const override = attr('data-speech');
  if (override !== null) return void out.push(protect(` ${override} `));
  if (SKIP_TAGS.has(tag)) return;

  // ── Math renderers (checked before aria-hidden, which they use internally)
  if (/\bkatex\b/.test(cls) && !/katex-(html|mathml)/.test(cls)) {
    const tex = el.querySelector('annotation[encoding="application/x-tex"]');
    const math = el.querySelector('math');
    const spoken = tex ? latexToSpeech(tex.textContent ?? '', latexOpts) : math ? mathmlToSpeech(math, latexOpts) : '';
    return void out.push(protect(` ${spoken} `));
  }
  if (tag === 'mjx-container') {
    const math = el.querySelector('math');
    const spoken = math ? mathmlToSpeech(math, latexOpts) : attr('aria-label') ?? el.textContent ?? '';
    return void out.push(protect(` ${spoken} `));
  }
  if (tag === 'script') {
    const type = attr('type') ?? '';
    if (/math\/tex/.test(type)) out.push(protect(` ${latexToSpeech(el.textContent ?? '', latexOpts)} `)); // MathJax v2
    else if (/math\/mml/.test(type)) {
      const m = parseHtml(el.textContent ?? '').querySelector('math');
      if (m) out.push(protect(` ${mathmlToSpeech(m, latexOpts)} `));
    }
    return;
  }
  if (/MathJax_Preview|MathJax_SVG|MathJax_CHTML|MathJax_Display/.test(cls) || tag === 'mjx-assistive-mml') return;
  if (tag === 'math') return void out.push(protect(` ${mathmlToSpeech(el, latexOpts)} `));
  if (attr('aria-hidden') === 'true') return;
  if (/\b(sr-only|visually-hidden|cdk-visually-hidden)\b/.test(cls)) return children();

  // ── Foreign-language span: keep it away from the English rules and tag it for the service
  const lang = attr('lang') ?? attr('xml:lang');
  if (lang && !/^en\b/i.test(lang) && !ctx.inLang) {
    const inner: string[] = [];
    el.childNodes.forEach((c) => walk(c, inner, o, { ...ctx, inLang: true }));
    const text = inner.join('').split(BREAK).join('. ').replace(/[-]/g, ' ');
    return void out.push(BREAK, protect(`${LANG_O}${lang}${LANG_SEP}${text}${LANG_C}`), BREAK);
  }

  // ── Program code: read literally, never through the maths/chemistry rules
  if (tag === 'pre' || tag === 'code' || tag === 'kbd' || tag === 'samp') {
    const lines = (el.textContent ?? '').split(/\r?\n/).filter((l) => l.trim());
    const spoken = lines.map(speakCode).join(` ${BREAK} `);
    return void out.push(...(tag === 'pre' ? [BREAK] : []), protect(` ${spoken} `), ...(tag === 'pre' ? [BREAK] : []));
  }

  // ── Underline: <u>, or Word's <span style="text-decoration: underline">
  const underlined = tag === 'u' || /text-decoration[^;]*underline/i.test(attr('style') ?? '');
  if (underlined && o.underline === 'describe') {
    out.push(U_O);
    children();
    return void out.push(U_C);
  }

  switch (tag) {
    case 'br':
      return void out.push(BREAK);
    case 'img': {
      const alt = (attr('alt') ?? attr('aria-label') ?? attr('title') ?? '').trim();
      // keep alt text unprotected so "H2O" or "30°" in alt text still gets normalised
      return void out.push(alt ? ` ${BREAK}Image: ${alt}.${BREAK} ` : o.imageFallback ? ` ${BREAK}${o.imageFallback}${BREAK} ` : ' ');
    }
    case 'svg': {
      const label = attr('aria-label') ?? el.querySelector('title')?.textContent ?? '';
      return void out.push(label ? ` ${BREAK}Diagram: ${label}.${BREAK} ` : o.imageFallback ? ` ${BREAK}${o.imageFallback}${BREAK} ` : ' ');
    }
    case 'input':
    case 'select':
    case 'textarea':
      return void out.push(protect(' blank '));
    case 'sub':
      out.push(SUB_O);
      children();
      return void out.push(S_CLOSE);
    case 'sup':
      out.push(SUP_O);
      children();
      return void out.push(S_CLOSE);
    case 'table':
      return walkTable(el, out, o, ctx);
    case 'ol':
    case 'ul': {
      ctx.olIndex = [...(ctx.olIndex ?? []), tag === 'ol' ? Number(attr('start') ?? 1) : 0];
      out.push(BREAK);
      children();
      out.push(BREAK);
      ctx.olIndex.pop();
      return;
    }
    case 'li': {
      const stack = ctx.olIndex ?? [];
      const n = stack[stack.length - 1];
      out.push(BREAK);
      if (n) {
        out.push(protect(` ${n}. `));
        stack[stack.length - 1] = n + 1;
      }
      children();
      return void out.push(BREAK);
    }
  }

  if (o.emphasisTags.includes(tag) || (underlined && o.underline === 'emphasis')) {
    out.push(EM_O);
    children();
    return void out.push(EM_C);
  }
  if (BLOCK_TAGS.has(tag)) {
    out.push(BREAK);
    children();
    return void out.push(BREAK);
  }
  children();
}

function walkTable(table: Element, out: string[], o: Opts, ctx: WalkCtx) {
  const rows = Array.from(table.querySelectorAll('tr'));
  if (!rows.length) return;
  const cellText = (c: Element) => {
    const parts: string[] = [];
    c.childNodes.forEach((n) => walk(n, parts, o, ctx));
    return parts.join('').split(BREAK).join(' ');
  };
  const caption = table.querySelector('caption');
  const first = Array.from(rows[0].children);
  const hasHeader = first.length > 0 && first.every((c) => c.localName === 'th');
  const dataRows = rows.length - (hasHeader ? 1 : 0);
  out.push(BREAK, protect(` A table with ${dataRows} row${dataRows === 1 ? '' : 's'}. `));
  if (caption) out.push(`${cellText(caption)}.`);
  out.push(BREAK);
  const headers = hasHeader ? first.map(cellText) : [];
  rows.forEach((tr, i) => {
    if (hasHeader && i === 0) {
      out.push(protect(' Columns: '), headers.join(', '), '.', BREAK);
      return;
    }
    const cells = Array.from(tr.children).map(cellText);
    const label = hasHeader ? i : i + 1;
    const body = cells.map((c, j) => (headers[j] ? `${headers[j]}: ${c}` : c)).join(', ');
    out.push(protect(` Row ${label}: `), body, '.', BREAK);
  });
  out.push(protect(' End of table. '), BREAK);
}

// ─────────────────────────────── 2. Text passes ────────────────────────────────

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function unicodeCleanup(s: string): string {
  s = s
    .replace(/[     ]/g, ' ')
    .replace(/[​-‍⁠﻿­]/g, '')
    .replace(/[‘’‛′](?=\w)/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/−/g, '−');
  return s;
}

function scriptChars(s: string): string {
  // runs of unicode super/subscripts → markers (x² → x^{2}, H₂O → H_{2}O)
  const supCls = Object.keys(SUPERSCRIPT_CHARS).join('');
  const subCls = Object.keys(SUBSCRIPT_CHARS).join('');
  s = s.replace(new RegExp(`[${supCls}]+`, 'g'), (m) => `${SUP_O}${[...m].map((c) => SUPERSCRIPT_CHARS[c]).join('')}${S_CLOSE}`);
  s = s.replace(new RegExp(`[${subCls}]+`, 'g'), (m) => `${SUB_O}${[...m].map((c) => SUBSCRIPT_CHARS[c]).join('')}${S_CLOSE}`);
  // caret typed by authors: x^2, 10^-3, x^{n+1}
  return outsideProtected(s, (p) =>
    p.replace(/([A-Za-z0-9)\]])\^(\{[^}]*\}|[-−]?\d+|[a-z])/g, (_, b, e: string) => `${b}${SUP_O}${e.replace(/^\{|\}$/g, '')}${S_CLOSE}`),
  );
}

/** 1s² 2s² 2p⁶ / 1s2 2s2 2p6 – must run before units, or "2s" becomes "2 seconds". */
function electronConfig(s: string): string {
  const orb = `[1-7][spdf](?:${SUP_O}\\d{1,2}${S_CLOSE}|\\d{1,2}(?![\\d.]))?`;
  const run = new RegExp(`(?:\\[[A-Z][a-z]?\\]\\s*)?${orb}(?:\\s+${orb})+|[1-7][spdf]${SUP_O}\\d{1,2}${S_CLOSE}`, 'g');
  return outsideProtected(s, (p) =>
    p.replace(run, (m) => {
      const spoken = m
        .replace(/\[([A-Z][a-z]?)\]/, (_, el: string) => `${[...el].map((c) => c.toUpperCase()).join(' ')} core,`)
        .replace(new RegExp(`([1-7])([spdf])(?:${SUP_O}(\\d{1,2})${S_CLOSE}|(\\d{1,2}))?`, 'g'), (_, n, l, a, b) => `${n} ${l}${a ?? b ? ` ${a ?? b}` : ''},`);
      return protect(` ${spoken.replace(/,\s*$/, '')} `);
    }),
  );
}

function inlineLatex(s: string, o: Opts): string {
  const lo = { letterNames: o.letterNames, chem: (src: string) => speakChemSource(src, o) };
  const sp = (tex: string) => protect(` ${latexToSpeech(tex, lo)} `);
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => sp(t));
  s = s.replace(/\\\[([\s\S]+?)\\\]/g, (_, t) => sp(t));
  s = s.replace(/\\\(([\s\S]+?)\\\)/g, (_, t) => sp(t));
  s = s.replace(/\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g, (_, t) => protect(` ${speakChemSource(t, o)} `));
  if (o.dollarMath) s = s.replace(/\$([^$\n]+?)\$/g, (_, t) => sp(t));
  return s;
}

function arrowsAndStates(s: string): string {
  return outsideProtected(s, (p) => {
    for (const [re, word] of ASCII_OPERATORS.slice(0, 3)) p = p.replace(re, word); // equilibrium, gives, comes from
    return p.replace(/↑/g, ' gas given off ').replace(/↓/g, ' precipitate ');
  });
}

/** Units, degrees, currency, per cent. Runs before generic sup/sub handling. */
function quantities(s: string): string {
  const unitKeys = Object.keys(UNITS).sort((a, b) => b.length - a.length).map(esc).join('|');
  const exp = `(?:${SUP_O}([-−]?\\d)${S_CLOSE})?`; // captures the power
  const expNC = `(?:${SUP_O}[-−]?\\d${S_CLOSE})?`; // same, non-capturing
  // number, then unit[^n], then any number of "/unit[^n]", " per unit[^n]", " unit^-n"
  const re = new RegExp(
    `(\\d${S_CLOSE}?)(\\s?)(${unitKeys})${exp}((?:\\s?(?:\\/|per\\s)\\s?(?:${unitKeys})${expNC}|\\s(?:${unitKeys})${expNC})*)(?![A-Za-z0-9${SUP_O}])`,
    'g',
  );
  const pieceRe = new RegExp(`\\s?(\\/|per\\s|\\s)\\s?(${unitKeys})${exp}`, 'g');

  const name = (unit: string, power: string | undefined, plural: boolean) => {
    const def = UNITS[unit];
    const base = plural ? def.many : def.one;
    const p = power?.replace('−', '-');
    if (!p || p === '1') return base;
    if (def.kind === 'len' && (p === '2' || p === '3')) return `${p === '2' ? 'square' : 'cubic'} ${base}`;
    return `${base} ${p === '2' ? 'squared' : p === '3' ? 'cubed' : `to the power of ${p}`}`;
  };

  return outsideProtected(s, (p) => {
    // ── Degrees: 30°, 30 °C, 30<sup>o</sup>, 30<sup>0</sup>C (common in Word-authored items)
    p = p.replace(new RegExp(`(\\d)\\s?(?:°|º|${SUP_O}[oO0°]${S_CLOSE})(?:\\s?([CF])\\b)?`, 'g'), (_, d, cf) =>
      `${d}${protect(` degrees${cf === 'C' ? ' Celsius' : cf === 'F' ? ' Fahrenheit' : ''} `)}`,
    );
    p = p.replace(/°\s?([CF])\b/g, (_, cf) => protect(cf === 'C' ? ' degrees Celsius ' : ' degrees Fahrenheit '));
    p = p.replace(/[°º]/g, protect(' degrees '));

    // ── Currency: ₦5,000 → 5,000 naira ; $2.50 → 2.50 dollars
    p = p.replace(/([₦$£€])\s?(\d(?:[\d,]*\d)?(?:\.\d+)?)(\s?(?:million|billion|thousand|k))?/g, (_, sym, n, mult) => {
      const [one, many] = CURRENCY[sym];
      return `${n}${mult ?? ''} ${protect(n === '1' && !mult ? one : many)}`;
    });
    p = p.replace(/\bN(\d(?:[\d,]*\d)?(?:\.\d+)?)\b/g, (_, n) => `${n} ${protect('naira')}`); // N5,000 = naira

    // ── Units after numbers
    p = p.replace(re, (_m, d: string, _sp, unit: string, pow: string | undefined, rest: string, offset: number, whole: string) => {
      const before = whole.slice(0, offset) + d;
      const numMatch = /(?:^|[^\d.,])([\d.,]+)$/.exec(before);
      // "a 10 μF capacitor", "an 8 kg mass": a quantity used as an adjective stays singular
      const adjectival = /\ban?\s+[\d.,]+$/i.test(before.replace(S_CLOSE, ''));
      const plural = !(numMatch && numMatch[1] === '1') && !adjectival;
      // "N m" is a product (newton metres), "/s", "per s" and "s^-1" are "per second".
      // The plural goes on the last unit before the first "per": "kilogram metres per second".
      const pieces: { unit: string; pow?: string; per: boolean }[] = [{ unit, pow, per: false }];
      rest.replace(pieceRe, (_m, sep: string, u2: string, p2: string | undefined) => {
        const neg = !!p2 && /^[-−]/.test(p2);
        const per = sep.trim() === '/' || sep.trim() === 'per' || neg || pieces[pieces.length - 1].per;
        pieces.push({ unit: u2, pow: neg ? p2!.replace(/^[-−]/, '') : p2, per });
        return '';
      });
      const lastNumerator = pieces.filter((x) => !x.per).length - 1;
      const words = pieces.map((x, i) =>
        `${x.per ? 'per ' : ''}${name(x.unit, x.pow, plural && i === lastNumerator)}`,
      );
      return `${d} ${protect(words.join(' '))}`;
    });

    // ── Per cent
    p = p.replace(/(\d)\s?%/g, `$1${protect(' per cent')}`);
    return p;
  });
}

/** Sub/sup left after chemistry and units: powers, ordinals, variable subscripts. */
function scripts(s: string): string {
  const reSup = new RegExp(`([A-Za-z0-9.)\\]]*)${SUP_O}([^${SUP_O}${SUB_O}${S_CLOSE}]*)${S_CLOSE}`);
  const reSub = new RegExp(`([A-Za-z0-9)\\]]*)${SUB_O}([^${SUP_O}${SUB_O}${S_CLOSE}]*)${S_CLOSE}`);
  return outsideProtected(s, (p) => {
    let guard = 0;
    while ((reSub.test(p) || reSup.test(p)) && guard++ < 200) {
      p = p.replace(reSub, (_, base: string, body: string) => {
        const b = body.trim();
        if (!b) return base;
        if (/^(log|lg)$/i.test(base)) return `${base}${protect(` base ${b} of `)}`;
        return `${base}${protect(` sub ${b} `)}`;
      });
      p = p.replace(reSup, (_, base: string, body: string) => {
        const b = body.trim().replace(/−/g, '-');
        if (!b) return base;
        if (/^(st|nd|rd|th)$/i.test(b) && /\d$/.test(base)) return base + b; // 1<sup>st</sup> → "1st"
        if (b === '*' || b === '†') return base; // footnote marks
        if (!base) return protect(` to the power of ${b} `);
        if (b === '2') return `${base}${protect(' squared ')}`;
        if (b === '3') return `${base}${protect(' cubed ')}`;
        if (/^[-+]?\d+$/.test(b)) return `${base}${protect(` to the power of ${b.replace('-', 'minus ').replace('+', 'plus ')} `)}`;
        if (/^[A-Za-z]$/.test(b)) return `${base}${protect(` to the power of ${b} `)}`;
        return `${base}${protect(' to the power of ')}${b}${protect(', end power, ')}`;
      });
    }
    return p.replace(new RegExp(`[${SUB_O}${SUP_O}${S_CLOSE}]`, 'g'), ' ');
  });
}

function blanks(s: string): string {
  return outsideProtected(s, (p) =>
    p
      .replace(/_{3,}|\.{4,}|…{2,}|-{4,}/g, protect(' blank '))
      .replace(/\(\s{1,}\)|\[\s{1,}\]/g, protect(' blank ')),
  );
}

function operators(s: string): string {
  return outsideProtected(s, (p) => {
    // fractions with unicode glyphs, and a/b between numbers (after units, so km/h is gone)
    p = p.replace(new RegExp(`(?:(\\d)\\s?)?([${Object.keys(UNICODE_FRACTIONS).join('')}])`, 'g'), (_, whole, f) =>
      `${whole ? `${whole} and ` : ''}${UNICODE_FRACTIONS[f]}`,
    );
    p = p.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g, (m) => protect(m.replace(/\//g, ' slash '))); // dates
    p = p.replace(/(\d+(?:\.\d+)?)\s?\/\s?(\d+(?:\.\d+)?)/g, '$1 over $2');
    p = p.replace(/\b([a-zA-Z])\s?\/\s?([a-zA-Z0-9])\b/g, '$1 over $2');

    for (const [re, word] of ASCII_OPERATORS.slice(3)) p = p.replace(re, word);


    // √ with a following bracket or number
    p = p.replace(/√\s?\(([^()]+)\)/g, ' the square root of, $1, end root, ');
    p = p.replace(/√\s?/g, ' the square root of ');

    // multiplication typed as x or * between numbers: 3 x 4, 2*5
    p = p.replace(/(\d)\s?[x×*]\s?(?=\d)/g, '$1 times ');
    p = p.replace(/(\d|\))\s*\*\s*(?=[a-zA-Z(])/g, '$1 times ');

    // minus vs hyphen
    p = p.replace(/\b(between\s+)?(1[5-9]\d\d|20\d\d)\s?[-–]\s?(1[5-9]\d\d|20\d\d)\b/gi, (_, btw, a, b) => `${btw ?? ''}${a} ${btw ? 'and' : 'to'} ${b}`); // 1990-2000
    p = p.replace(/(^|[\s(=<>,:])[-−–](?=\s?[\d.]|\s?[a-z]\b|\s?\()/g, '$1 minus '); // leading negative
    p = p.replace(/([\d)a-zA-Z])\s*[−–]\s*(?=[\d(a-zA-Z])/g, '$1 minus '); // true minus sign / en dash
    p = p.replace(/(\d|\)|\b[a-z])\s*-\s*(?=\d|\(|[a-z]\b)/g, '$1 minus '); // 5-3, x - 2, (a)-b
    p = p.replace(/([A-Za-z]{2,}[.,;]?)\s[-–—]\s(?=[A-Za-z]{2,})/g, '$1, '); // dash used as punctuation
    p = p.replace(/\s[-–]\s/g, ' minus '); // anything else spaced is subtraction
    p = p.replace(/\s—\s/g, ', ');
    // brackets around plain-text maths – "(x+1)" – are spoken; prose brackets are left silent
    p = p.replace(/\(([^()]+)\)/g, (m, inner: string) =>
      /[+\-−×÷*/=]|\b(minus|plus|times)\b/.test(inner) && !/[A-Za-z]{3,}/.test(inner.replace(/\b(minus|plus|times)\b/g, '')) && /[\da-z]/i.test(inner)
        ? ` open bracket ${inner} close bracket `
        : m,
    );

    // symbols and Greek
    for (const [sym, word] of Object.entries(SYMBOLS)) p = p.split(sym).join(` ${word} `);
    for (const [g, word] of Object.entries(GREEK)) p = p.split(g).join(` ${word} `);
    return p;
  });
}

function examConventions(s: string, o: Opts): string {
  return outsideProtected(s, (p) => {
    for (const [re, word] of ABBREVIATIONS) p = p.replace(re, word);

    // Roman numerals in statement lists: "I and II only", "I, II and III", "(ii)"
    const R = '(?:VIII|VII|VI|IV|IX|III|II|I|V|X)';
    const romanList = new RegExp(`\\b${R}\\b(?:\\s*(?:,|and|&|or)\\s*\\b${R}\\b)+|\\b${R}\\b(?=\\s+only\\b)`, 'g');
    p = p.replace(romanList, (m) => m.replace(new RegExp(`\\b${R}\\b`, 'g'), (r) => ROMAN[r]));
    p = p.replace(/(^|\s)\((i{1,3}|iv|v|vi{1,3}|ix|x)\)/g, (_, pre, r: string) => `${pre}${ROMAN[r.toUpperCase()]} `);
    p = p.replace(/(^|\s)\(([a-h])\)\s/g, '$1part $2, '); // (a) (b) sub-parts

    // SHOUTED ITEMS: if a run is mostly capitals, speak it in normal case so the
    // engine doesn't spell words out; keep the exam keywords for emphasis below.
    const caps = p.match(/\b[A-Z]{2,}\b/g) ?? [];
    const letters = p.replace(/[^A-Za-z]/g, '');
    if (caps.length >= 3 && letters.replace(/[^A-Z]/g, '').length / letters.length > 0.8) {
      p = p.replace(/\b(?:[A-Z]{2,}|A)\b/g, (w) => (o.emphasisWords.includes(w) ? w : w.toLowerCase()));
    }

    // Upper-case exam keywords → emphasised lower-case words
    if (o.emphasisWords.length) {
      const re = new RegExp(`\\b(${o.emphasisWords.join('|')})\\b`, 'g');
      p = p.replace(re, (w) => `${EM_O}${w.toLowerCase()}${EM_C}`);
    }
    return p;
  });
}

// ─────────────────────────────── 3. Chunking ───────────────────────────────────

function toChunks(s: string, o: Opts): SpeechChunk[] {
  s = s.replace(new RegExp(`[${PROT_O}${PROT_C}${U_O}${U_C}${EM_O}${EM_C}]`, 'g'), '');
  const chunks: SpeechChunk[] = [];
  const splitter = new RegExp(`([${LANG_C}]|${LANG_O}[^${LANG_SEP}]*${LANG_SEP})`);
  for (const block of s.split(BREAK)) {
    let lang: string | undefined;
    const blockChunks: SpeechChunk[] = [];
    for (const part of block.split(splitter)) {
      if (part === LANG_C) lang = undefined;
      else if (part.startsWith(LANG_O)) lang = part.slice(1, -1);
      else {
        const text = tidy(part);
        if (!text || /^[,.;:\s]+$/.test(text)) continue;
        const prev = blockChunks[blockChunks.length - 1];
        if (prev && prev.lang === lang) prev.text = tidy(`${prev.text} ${text}`);
        else blockChunks.push({ text, ...(lang && { lang }) });
      }
    }
    if (!blockChunks.length) continue;
    if (o.detectLanguages) {
      for (const c of blockChunks) if (!c.lang) c.lang = detectLanguage(c.text);
    }
    blockChunks[blockChunks.length - 1].pauseAfterMs = o.blockPauseMs;
    chunks.push(...blockChunks);
  }
  for (const c of chunks) if (!c.lang) delete c.lang;
  return chunks;
}

/** Yoruba / Igbo / Hausa by their distinctive letters (needs at least two hits). */
function detectLanguage(text: string): string | undefined {
  let best: string | undefined;
  let bestHits = 1;
  for (const { lang, chars } of LANGUAGE_HINTS) {
    const hits = text.match(chars)?.length ?? 0;
    if (hits > bestHits) {
      best = lang;
      bestHits = hits;
    }
  }
  return best;
}

function tidy(t: string): string {
  return t
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:?!])/g, '$1')
    .replace(/([,;:])(?:\s*[,;:])+/g, '$1')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/^[,;\s]+/, '')
    .replace(/,\s*([.?!])/g, '$1')
    .trim();
}

// ─────────────────────────────── Public API ────────────────────────────────────

/** Speak a chemistry source string (from \ce{} or plain text). */
export function speakChemSource(src: string, o: Partial<Opts> = {}): string {
  const opts = { ...DEFAULTS, ...o };
  const { text } = chemistryStep(nuclear(scriptChars(unicodeCleanup(mhchemToMarked(src)))), opts);
  return tidy(scripts(operators(arrowsAndStates(text))).replace(new RegExp(`[${PROT_O}${PROT_C}]`, 'g'), ''));
}

/** Normalise one piece of item HTML (stem, option, passage) into speech chunks. */
export function normalizeForSpeech(html: string, options: NormalizeOptions = {}): SpeechChunk[] {
  const o: Opts = { ...DEFAULTS, ...options };
  const out: string[] = [];
  walk(parseHtml(html ?? ''), out, o);
  let s = out.join('');

  s = unicodeCleanup(s);
  s = underlines(s, o.letterNames);
  const flags = detectSubjects(s);
  s = inlineLatex(s, o);
  s = scriptChars(s);
  s = blanks(s);
  s = phonetics(s, flags); // /θ/
  s = stressedSyllables(s, flags); // proGRESS
  s = numberBases(s); // 1011₂ – before chemistry and generic subscripts
  s = nuclear(s); // ²³⁵₉₂U
  s = electronConfig(s); // 1s² 2s² – before units
  s = genetics(s, flags); // Aa × Aa – before chemistry
  const chem = chemistryStep(s, o);
  s = chem.text;
  if (chem.found || /⇌|→|->/.test(s)) s = arrowsAndStates(s);
  s = coordinates(s); // 6°27′N – before the generic degrees rule
  s = accounting(s, flags); // Dr/Cr, b/d, (5,000) – before currency and fractions
  s = ratios(s, flags); // 3:1
  s = quantities(s);
  s = scripts(s);
  s = operators(s);
  s = examConventions(s, o);
  return toChunks(s, o);
}

/** Convenience: the whole thing as one string (for logging, previews, caching). */
export function toSpeechText(html: string, options?: NormalizeOptions): string {
  return normalizeForSpeech(html, options).map((c) => c.text).join(' ');
}

export interface SpeakableItem {
  number?: number | string;
  stem: string;
  options?: { label: string; html: string }[];
}

/** Full read-out script for an MCQ: "Question 3. <stem>. Option A. <text> …" */
export function buildItemSpeech(item: SpeakableItem, options: NormalizeOptions = {}): SpeechChunk[] {
  const o = { ...DEFAULTS, ...options };
  const say = (l: string) => o.letterNames[l] ?? l;
  const chunks: SpeechChunk[] = [];
  if (item.number !== undefined) chunks.push({ text: `Question ${item.number}.`, pauseAfterMs: 300 });
  chunks.push(...normalizeForSpeech(item.stem, o));
  for (const opt of item.options ?? []) {
    chunks.push({ text: `Option ${say(opt.label)}.`, pauseAfterMs: 150 });
    const body = normalizeForSpeech(opt.html, o);
    if (body.length) body[body.length - 1].pauseAfterMs = 400;
    chunks.push(...body);
  }
  return chunks;
}
