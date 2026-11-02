/**
 * Subject-specific passes: English (underlining, stress, phonetics), Maths (number
 * bases, ratios), Geography (coordinates, bearings), Physics/Chemistry (nuclear
 * notation), Biology (genetic crosses), Accounting/Commerce, Computer Studies (code).
 *
 * Rules that could misfire elsewhere only run when the item's own wording shows
 * which subject it belongs to (see SubjectFlags).
 */
import { EM_C, EM_O, S_CLOSE, SUB_O, SUP_O, U_C, U_O, outsideProtected, protect } from './markers';
import {
  ACCOUNTING_ABBREVIATIONS, ACCOUNTING_CONTEXT, ELEMENT_NAMES, ELEMENT_SYMBOLS_BY_Z, GENETICS_CONTEXT, IPA_NAMES,
  IPA_SPECIFIC, RATIO_CONTEXT, SOUND_CONTEXT, STRESS_CONTEXT,
} from './lexicon';

export interface SubjectFlags {
  accounting: boolean;
  ratio: boolean;
  genetics: boolean;
  stress: boolean;
  sound: boolean;
}

export function detectSubjects(s: string): SubjectFlags {
  const plain = s.replace(/[-]/g, ' ');
  return {
    accounting: ACCOUNTING_CONTEXT.test(plain),
    ratio: RATIO_CONTEXT.test(plain),
    genetics: GENETICS_CONTEXT.test(plain),
    stress: STRESS_CONTEXT.test(plain),
    sound: SOUND_CONTEXT.test(plain),
  };
}

const spellLetters = (s: string, letters: Record<string, string> = {}) =>
  [...s.replace(/\s+/g, '')].map((c) => letters[c] ?? c).join(' ');

// ─────────────────────────────── English ───────────────────────────────────────

/**
 * b<u>oo</u>k  → "book, with the letters o o underlined"
 * <u>adamant</u> → "adamant, underlined" (emphasised)
 */
export function underlines(s: string, letters: Record<string, string> = {}): string {
  const W = 'A-Za-z\\u00C0-\\u024F\\u1E00-\\u1EFF';
  const re = new RegExp(`([${W}]*)${U_O}([^${U_C}]*)${U_C}([${W}]*)`, 'g');
  return s.replace(re, (_, pre: string, mid: string, suf: string) => {
    const inner = mid.replace(/[-]/g, '');
    if (!inner.trim()) return pre + suf;
    if (pre || suf) {
      const n = inner.replace(/\s/g, '').length;
      const what = n === 1 ? `the letter ${spellLetters(inner, letters)}` : `the letters ${spellLetters(inner, letters)}`;
      return `${pre}${inner}${suf}${protect(`, with ${what} underlined, `)}`;
    }
    return mid;
  });
}

/** proGRESS → "progress, with the letters g r e s s in capitals" (only in stress questions). */
export function stressedSyllables(s: string, f: SubjectFlags): string {
  if (!f.stress) return s;
  return outsideProtected(s, (p) =>
    p.replace(/\b([a-z]*)([A-Z]{2,})([a-z]*)\b/g, (m, pre: string, caps: string, suf: string) => {
      if (!pre && !suf) return m; // a whole word in capitals is not a stress marking
      if (!pre && suf === 's') return m; // plural acronym: PCs, IDs
      return `${(pre + caps + suf).toLowerCase()}${protect(`, with the letters ${spellLetters(caps.toLowerCase())} in capitals, `)}`;
    }),
  );
}

/** /θ/ → "the phonetic symbol theta". Names the symbol; never gives an example word. */
export function phonetics(s: string, f: SubjectFlags): string {
  return outsideProtected(s, (p) =>
    p.replace(/\/([^/\s]{1,8})\//g, (m, body: string) => {
      const ipa = IPA_SPECIFIC.test(body);
      if (!ipa && !(f.sound && /^[a-zɡ]{1,3}$/.test(body))) return m;
      let rest = body;
      const names: string[] = [];
      while (rest) {
        const hit = IPA_NAMES.find(([sym]) => rest.startsWith(sym));
        if (hit) {
          names.push(hit[1]);
          rest = rest.slice(hit[0].length);
        } else {
          names.push(rest[0]);
          rest = rest.slice(1);
        }
      }
      return protect(`, phonetic symbol${names.length > 1 ? 's' : ''} ${names.join(', ')}, `);
    }),
  );
}

// ─────────────────────────────── Maths ─────────────────────────────────────────

const BASE_WORDS: Record<string, number> = { two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, sixteen: 16 };

/** 101101<sub>2</sub> → "1 0 1 1 0 1, base 2";  245<sub>10</sub> → "245, base 10";  1A<sub>16</sub> → "1 A, base 16" */
export function numberBases(s: string): string {
  const re = new RegExp(`(^|[^\\w.])([0-9A-F]+(?:\\.[0-9A-F]+)?)${SUB_O}\\s*\\(?\\s*(\\d{1,2}|two|three|four|five|six|seven|eight|nine|ten|sixteen)\\s*\\)?\\s*${S_CLOSE}`, 'g');
  return outsideProtected(s, (p) =>
    p.replace(re, (m, lead: string, digits: string, baseRaw: string) => {
      const base = BASE_WORDS[baseRaw] ?? Number(baseRaw);
      if (base < 2 || base > 16) return m;
      const valid = [...digits.replace('.', '')].every((d) => parseInt(d, 16) < base);
      if (!valid) return m;
      const spoken = base === 10 ? digits : [...digits].map((d) => (d === '.' ? 'point' : d)).join(' ');
      return `${lead}${protect(` ${spoken}, base ${base}, `)}`;
    }),
  );
}

/** 3:1 → "3 to 1" in ratio/scale items, and always for three or more terms (9:3:3:1). */
export function ratios(s: string, f: SubjectFlags): string {
  const n = '\\d+(?:,\\d{3})*(?:\\.\\d+)?';
  return outsideProtected(s, (p) =>
    p.replace(new RegExp(`(^|[^\\d:])(${n}(?:\\s?:\\s?${n})+)(?![\\d:])`, 'g'), (m, lead: string, run: string) => {
      const terms = run.split(/\s?:\s?/);
      if (terms.length < 3 && !f.ratio) return m; // keeps 10:30 and John 3:16 as they are
      return `${lead}${protect(` ${terms.join(' to ')} `)}`;
    }),
  );
}

// ─────────────────────────────── Geography ─────────────────────────────────────

const COMPASS: Record<string, string> = { N: 'north', S: 'south', E: 'east', W: 'west' };

/** 6°27′N 3°24′E, 30°N, N30°E, 25° 30′ → degrees/minutes/compass words. Runs before the generic degrees rule. */
export function coordinates(s: string): string {
  const D = `(?:°|º|${SUP_O}[oO0°]${S_CLOSE})`;
  return outsideProtected(s, (p) => {
    // bearings: N30°E, S 45° W
    p = p.replace(new RegExp(`\\b([NS])\\s?(\\d{1,3}(?:\\.\\d+)?)\\s?${D}\\s?([EW])\\b`, 'g'), (_, a, d, b) => protect(` ${COMPASS[a]} ${d} degrees ${COMPASS[b]} `));
    // degrees + minutes (+ seconds), optional compass letter
    p = p.replace(
      new RegExp(`(\\d{1,3})\\s?${D}\\s?(\\d{1,2}(?:\\.\\d+)?)\\s?['′](?:\\s?(\\d{1,2}(?:\\.\\d+)?)\\s?["″])?(?:\\s?([NSEW])\\b)?`, 'g'),
      (_, d, min, sec, dir) =>
        protect(` ${d} degrees ${min} minutes${sec ? ` ${sec} seconds` : ''}${dir ? ` ${COMPASS[dir]}` : ''} `),
    );
    // degrees + compass only: 30°N (but not 30°C / 30°F)
    p = p.replace(new RegExp(`(\\d{1,3}(?:\\.\\d+)?)\\s?${D}\\s?([NSEW])\\b`, 'g'), (_, d, dir) => protect(` ${d} degrees ${COMPASS[dir]} `));
    return p;
  });
}

// ─────────────────────────────── Physics / Chemistry ───────────────────────────

const PARTICLES: Record<string, string> = {
  n: 'a neutron', p: 'a proton', e: 'an electron', 'β': 'a beta particle', 'α': 'an alpha particle', 'γ': 'a gamma ray',
};

/**
 * Nuclear notation with mass number and atomic number as pre-scripts:
 * ²³⁵₉₂U → "uranium 235, atomic number 92";  ⁴₂He → "helium 4, an alpha particle";  ⁰₋₁e → "a beta particle, an electron"
 */
export function nuclear(s: string): string {
  const sup = `${SUP_O}\\s*(\\d{1,3})\\s*${S_CLOSE}`;
  const sub = `${SUB_O}\\s*([-−]?\\d{1,3})\\s*${S_CLOSE}`;
  const sym = `([A-Z][a-z]?|[npeβαγ])(?![a-z])`;
  const re = new RegExp(`(\\b\\d+\\s?)?(?:${sup}\\s?${sub}\\s?${sym}|${sub}\\s?${sup}\\s?${sym})`, 'g');
  const PLURAL: Record<string, string> = { n: 'neutrons', p: 'protons', e: 'electrons', 'β': 'beta particles', 'α': 'alpha particles', 'γ': 'gamma rays' };
  return outsideProtected(s, (p) =>
    p.replace(re, (m, coef: string | undefined, a1, z1, s1, z2, a2, s2) => {
      const k = coef?.trim();
      if (k && k !== '1' && PARTICLES[s1 ?? s2]) return protect(` ${k} ${PLURAL[s1 ?? s2]} `);
      const lead = coef ?? '';
      const mass = a1 ?? a2;
      const z = (z1 ?? z2).replace('−', '-');
      const symbol: string = s1 ?? s2;
      if (PARTICLES[symbol]) {
        if (symbol === 'e' && z === '-1') return lead + protect(' a beta particle, an electron ');
        if (symbol === 'e' && z === '1') return lead + protect(' a positron ');
        return lead + protect(` ${PARTICLES[symbol]} `);
      }
      const zn = Number(z);
      const name = ELEMENT_SYMBOLS_BY_Z[zn - 1] === symbol ? ELEMENT_NAMES[zn - 1] : ELEMENT_NAMES[ELEMENT_SYMBOLS_BY_Z.indexOf(symbol)];
      if (!name) return m;
      if (symbol === 'He' && mass === '4' && z === '2') return lead + protect(' helium 4, an alpha particle ');
      return lead + protect(` ${name} ${mass}, atomic number ${z} `);
    }),
  );
}

// ─────────────────────────────── Biology ───────────────────────────────────────

function isGenotype(tok: string): boolean {
  if (tok.length < 2 || tok.length % 2) return false;
  for (let i = 0; i < tok.length; i += 2) {
    if (tok[i].toLowerCase() !== tok[i + 1].toLowerCase()) return false;
  }
  return /[A-Z]/.test(tok) || /^[a-z]+$/.test(tok);
}

const caseName = (c: string) => (c === c.toUpperCase() ? `capital ${c}` : `small ${c}`);

/** Aa × Aa → "capital A small a, crossed with, capital A small a"; Xᴴ → "X capital H". Genetics items only. */
export function genetics(s: string, f: SubjectFlags): string {
  if (!f.genetics) return s;
  return outsideProtected(s, (p) => {
    // sex-linked alleles written as superscripts: X<sup>H</sup>X<sup>h</sup>, X<sup>H</sup>Y
    p = p.replace(new RegExp(`([XY])${SUP_O}([A-Za-z])${S_CLOSE}`, 'g'), (_, chr, al) => protect(` ${chr} ${caseName(al)}, `));
    // crosses
    p = p.replace(/\b([A-Za-z]{2,8})\s*[x×]\s*([A-Za-z]{2,8})\b/g, (m, a, b) =>
      isGenotype(a) && isGenotype(b) ? `${a} ${protect(', crossed with, ')} ${b}` : m,
    );
    // genotype tokens with mixed case (Aa, AaBb, TT, tt) read letter by letter with case
    p = p.replace(/\b[A-Za-z]{2,8}\b/g, (tok) =>
      isGenotype(tok)
        ? protect(` ${[...tok].map(caseName).join(' ')} `)
        : tok,
    );
    return p;
  });
}

// ─────────────────────────────── Accounting / Commerce ─────────────────────────

/** Dr/Cr, b/d, c/f, (5,000) negatives, ₦'000 column headings. */
export function accounting(s: string, f: SubjectFlags): string {
  return outsideProtected(s, (p) => {
    p = p.replace(/(?:₦|\bN)\s?['’]000\b/g, protect(' thousands of naira '));
    if (!f.accounting) return p;
    for (const [re, word] of ACCOUNTING_ABBREVIATIONS) p = p.replace(re, ` ${word} `);
    // bracketed amounts are negatives in accounts: (5,000) or (₦5,000.00)
    p = p.replace(/\((₦|N)?\s?(\d{1,3}(?:,\d{3})+(?:\.\d{1,2})?|\d+\.\d{2})\)/g, (_, cur, n) =>
      protect(` minus ${n}${cur ? ' naira' : ''} `),
    );
    return p;
  });
}

// ─────────────────────────────── Computer studies ──────────────────────────────

const CODE_TOKENS: [RegExp, string][] = [
  [/==/g, ' is equal to '], [/!=|<>/g, ' is not equal to '], [/<=/g, ' less than or equal to '],
  [/>=/g, ' greater than or equal to '], [/&&/g, ' and '], [/\|\|/g, ' or '], [/\+\+/g, ' plus plus '],
  [/--/g, ' minus minus '], [/\+=/g, ' plus equals '], [/-=/g, ' minus equals '], [/\*\*/g, ' to the power of '],
  [/=/g, ' equals '], [/</g, ' less than '], [/>/g, ' greater than '], [/\+/g, ' plus '], [/-/g, ' minus '],
  [/\*/g, ' times '], [/\//g, ' divided by '], [/%/g, ' mod '], [/\^/g, ' to the power of '],
  [/\(/g, ' open bracket '], [/\)/g, ' close bracket '], [/\[/g, ' open square bracket '], [/\]/g, ' close square bracket '],
  [/\{/g, ' open brace '], [/\}/g, ' close brace '], [/;/g, ' semicolon, '], [/"/g, ' quote '], [/'/g, ' quote '],
  [/:/g, ' colon '], [/#/g, ' hash '], [/\b([A-Za-z_]\w*)\.([A-Za-z_]\w*)/g, '$1 dot $2'], [/_/g, ' underscore '],
];

/** A line of program code, read literally. */
export function speakCode(line: string): string {
  let t = line.trim();
  // QBASIC/pseudocode keywords in capitals would be spelt out by some voices
  t = t.replace(/\b[A-Z]{2,}\b/g, (w) => w.toLowerCase());
  for (const [re, word] of CODE_TOKENS) t = t.replace(re, word);
  return t.replace(/\s+/g, ' ').trim();
}
