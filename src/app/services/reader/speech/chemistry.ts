/**
 * Chemistry: recognise formulae (H2SO4, H<sub>2</sub>O, SO<sub>4</sub><sup>2-</sup>,
 * Ca(OH)2, CuSO4·5H2O, CH3COOH) and read them element by element, the way a
 * teacher would: "H 2 S O 4", "S O 4, 2 minus".
 */
import { SUB_O, SUP_O, S_CLOSE, protect, outsideProtected } from './markers';
import { ELEMENTS, FORMULA_STOPLIST, FORMULA_WHITELIST, MOLECULAR_ELEMENTS, STATE_SYMBOLS, UNITS } from './lexicon';

export interface ChemOptions {
  letterNames?: Record<string, string>;
}

function spellSymbol(sym: string, letters: Record<string, string>): string {
  return [...sym].map((ch) => letters[ch.toUpperCase()] ?? ch.toUpperCase()).join(' ');
}

function speakCharge(raw: string): string | null {
  const v = raw.replace(/[−–]/g, '-').replace(/\s/g, '');
  const m = /^(\d*)([+-])$/.exec(v) ?? /^([+-])(\d*)$/.exec(v);
  if (!m) return null;
  const [n, sign] = /\d/.test(m[1]) || m[1] === '' ? [m[1], m[2]] : [m[2], m[1]];
  const word = sign === '+' ? 'plus' : 'minus';
  return n && n !== '1' ? `${n} ${word}` : word;
}

/** Try to read `token` as a formula. Returns speech or null if it isn't one. */
export function speakFormula(token: string, opts: ChemOptions = {}): string | null {
  if (FORMULA_STOPLIST.has(token)) return null;
  const letters = opts.letterNames ?? {};
  const parts: string[] = [];
  let i = 0;
  let elements = 0;
  const distinctSymbols = new Set<string>();
  let hasLower = false;
  let hasCount = false; // digit or subscript after an element/bracket
  let hasCharge = false;
  let hasMarkup = false; // came from <sub>/<sup> – strong evidence
  let depth = 0;
  const counts: string[] = [];

  const coef = /^\d+/.exec(token);
  if (coef) {
    parts.push(coef[0]);
    i = coef[0].length;
  }

  while (i < token.length) {
    const rest = token.slice(i);
    const two = rest.slice(0, 2);
    const one = rest[0];
    let m: RegExpExecArray | null;

    if (/^[A-Z][a-z]$/.test(two) && ELEMENTS.has(two) && !/^[a-z]/.test(rest.slice(2))) {
      parts.push(spellSymbol(two, letters));
      elements++;
      distinctSymbols.add(two);
      hasLower = true;
      i += 2;
    } else if (/^[A-Z]$/.test(one) && ELEMENTS.has(one)) {
      parts.push(spellSymbol(one, letters));
      elements++;
      distinctSymbols.add(one);
      i += 1;
    } else if ((m = /^\d+/.exec(rest))) {
      if (!elements && !depth) return null;
      parts.push(m[0]);
      counts.push(m[0]);
      hasCount = true;
      i += m[0].length;
    } else if (one === SUB_O) {
      const end = token.indexOf(S_CLOSE, i);
      const body = token.slice(i + 1, end);
      if (end < 0 || !/^(\d+|[xyn])$/.test(body)) return null;
      parts.push(body);
      hasCount = hasMarkup = true;
      i = end + 1;
    } else if (one === SUP_O) {
      const end = token.indexOf(S_CLOSE, i);
      const charge = end < 0 ? null : speakCharge(token.slice(i + 1, end));
      if (!charge) return null;
      parts.push(`${parts.length ? ',' : ''} ${charge}`.trim());
      hasCharge = hasMarkup = true;
      i = end + 1;
    } else if ((m = /^\((aq|s|l|g)\)$/.exec(rest)) && elements) {
      parts.push(`, ${STATE_SYMBOLS[m[1]]},`);
      i += m[0].length;
    } else if (one === '(' || one === '[') {
      parts.push('open bracket');
      depth++;
      i++;
    } else if (one === ')' || one === ']') {
      if (!depth) return null;
      parts.push('close bracket');
      depth--;
      i++;
    } else if ((one === '·' || one === '•' || one === '.' || one === '*') && /^[\d A-Z]/.test(rest.slice(1)) && elements) {
      parts.push(', dot');
      i++;
    } else if (one === '-' && /^[A-Z]/.test(rest.slice(1)) && elements) {
      parts.push(','); // condensed structural formula: CH3-CH2-OH
      i++;
    } else {
      return null;
    }
  }

  if (depth || !elements) return null;
  const looksChemical =
    hasMarkup ||
    hasCharge ||
    FORMULA_WHITELIST.has(token) ||
    (hasCount && elements >= 2) ||
    // a lone element with a plain-digit count must look molecular (O2, Cl2, P4, S8),
    // otherwise "N5000" (naira) or "B12" would be read as chemistry
    (hasCount && [...distinctSymbols].every((s) => MOLECULAR_ELEMENTS.has(s)) && counts.every((c) => /^[2-8]$/.test(c))) ||
    (hasLower && elements >= 2);
  if (!looksChemical) return null;

  return parts.join(' ').replace(/\s+,/g, ',').replace(/\s+/g, ' ').trim();
}

// candidate = optional coefficient, then something starting with a capital or bracket,
// made of letters/digits/brackets/hydrate dots and whole <sub>/<sup> marker groups.
const CANDIDATE = new RegExp(
  `[0-9]*[A-Z(\\[](?:[A-Za-z0-9()\\[\\]·•]|-(?=[A-Z])|${SUB_O}[^${S_CLOSE}]*${S_CLOSE}|${SUP_O}[^${S_CLOSE}]*${S_CLOSE})*`,
  'g',
);

function balanceTrim(tok: string): [string, string, string] {
  // strip brackets that belong to the sentence, not the formula: "(e.g. H2O)"
  let lead = '';
  let trail = '';
  const count = (s: string, ch: string) => s.split(ch).length - 1;
  while (tok.startsWith('(') && count(tok, '(') > count(tok, ')')) {
    lead += '(';
    tok = tok.slice(1);
  }
  while (/[)\]]$/.test(tok) && count(tok, ')') + count(tok, ']') > count(tok, '(') + count(tok, '[')) {
    trail = tok.slice(-1) + trail;
    tok = tok.slice(0, -1);
  }
  // whole formula wrapped in brackets: "(H2O)" – the brackets are the sentence's
  if (tok.startsWith('(') && tok.endsWith(')')) {
    let depth = 0;
    let closesAtEnd = true;
    for (let i = 0; i < tok.length; i++) {
      if (tok[i] === '(') depth++;
      else if (tok[i] === ')' && --depth === 0 && i < tok.length - 1) closesAtEnd = false;
    }
    if (closesAtEnd) return [lead + '(', tok.slice(1, -1), ')' + trail];
  }
  return [lead, tok, trail];
}

/** Pipeline step: replace every formula in unprotected text with protected speech. */
export function chemistryStep(s: string, opts: ChemOptions = {}): { text: string; found: boolean } {
  let found = false;
  const text = outsideProtected(s, (part) =>
    part.replace(CANDIDATE, (match, offset: number, whole: string) => {
      const before = whole[offset - 1];
      if (before && /[A-Za-z0-9_]/.test(before)) return match; // inside a word
      const [lead, tok, trail] = balanceTrim(match);
      // "J kg⁻¹ K⁻¹": a unit with a negative power right after a quantity is not the ion K⁻
      const bare = tok.replace(new RegExp(`${SUP_O}[^${S_CLOSE}]*${S_CLOSE}`, 'g'), '');
      if (UNITS[bare] && /(\d|[\uE002])\s*$/.test(whole.slice(0, offset))) return match;
      const spoken = speakFormula(tok, opts);
      if (!spoken) return match;
      found = true;
      return `${lead}${protect(` ${spoken} `)}${trail}`;
    }),
  );
  if (!found) return { text, found };
  // state symbols separated by a space: "H2O (l)"
  const withStates = outsideProtected(text, (p) =>
    p.replace(/^\s*\((aq|s|l|g)\)/, (_, k: string) => protect(`, ${STATE_SYMBOLS[k]},`)),
  );
  return { text: withStates, found };
}

/** mhchem source (`\ce{2H2 + O2 -> 2H2O}`) → speech, reusing the plain-text pipeline. */
export function mhchemToMarked(src: string): string {
  return src
    .replace(/\^\{([^}]*)\}|\^([0-9]*[+\-]|[0-9]+)/g, (_, a, b) => `${SUP_O}${a ?? b}${S_CLOSE}`)
    .replace(/_\{([^}]*)\}|_([0-9]+)/g, (_, a, b) => `${SUB_O}${a ?? b}${S_CLOSE}`)
    .replace(/([A-Za-z0-9)\]])([+-])(?=\s|$|\()/g, `$1${SUP_O}$2${S_CLOSE}`) // Na+ , Cl- written inline
    .replace(/<=>|<=>>|<<=>/g, ' ⇌ ')
    .replace(/->/g, ' → ')
    .replace(/\s\^\s/g, ' ↑ ')
    .replace(/\s+v\s+/g, ' ↓ ');
}
