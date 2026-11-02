/**
 * A tiny math AST shared by the LaTeX parser and the MathML reader, plus the
 * function that turns it into English speech. Keeping one speaker means
 * `\frac{1}{2}`, `<mfrac>` and KaTeX/MathJax output all sound identical.
 */
import { FUNCTIONS, GREEK, UNITS, ordinal } from './lexicon';

export type MNode =
  | { t: 'num'; v: string }
  | { t: 'id'; v: string; word?: boolean } // variable; word=true → don't spell letters (theta)
  | { t: 'ch'; v: string } // raw operator/punct char, resolved by finalizeRow
  | { t: 'op'; v: string } // already-spoken operator ("plus")
  | { t: 'text'; v: string } // literal words (\text{…}, <mtext>)
  | { t: 'fn'; v: string } // function name already spoken ("sine")
  | { t: 'row'; c: MNode[] }
  | { t: 'fenced'; open: string; close: string; c: MNode }
  | { t: 'abs'; c: MNode }
  | { t: 'frac'; n: MNode; d: MNode }
  | { t: 'binom'; n: MNode; k: MNode }
  | { t: 'sqrt'; idx?: MNode; b: MNode }
  | { t: 'scr'; base: MNode; sub?: MNode; sup?: MNode }
  | { t: 'big'; op: 'sum' | 'prod' | 'int' | 'lim' | 'oint'; sub?: MNode; sup?: MNode }
  | { t: 'accent'; a: string; b: MNode }
  | { t: 'table'; rows: MNode[][] }
  | { t: 'raw'; v: string }; // final speech, insert as-is

export interface MathSpeechOptions {
  /** Map letters to how they should be said, e.g. { a: 'ay' } if your voice says "uh". */
  letterNames?: Record<string, string>;
}

/** Characters → spoken operators inside math. */
const CHAR_OPS: Record<string, string> = {
  '+': 'plus', '-': 'minus', '−': 'minus', '–': 'minus', '=': 'equals', '<': 'is less than', '>': 'is greater than',
  '×': 'times', '*': 'times', '·': 'times', '⋅': 'times', '∙': 'times', '÷': 'divided by', '/': 'over',
  '±': 'plus or minus', '∓': 'minus or plus', '≤': 'is less than or equal to', '≥': 'is greater than or equal to',
  '≠': 'is not equal to', '≈': 'is approximately equal to', '≡': 'is identical to', '∝': 'is proportional to',
  '∼': 'is similar to', '≅': 'is congruent to', '→': 'gives', '⟶': 'gives', '←': 'comes from', '⇌': 'is in equilibrium with',
  '⇒': 'implies', '⇔': 'if and only if', '↔': 'if and only if', '∈': 'is an element of', '∉': 'is not an element of',
  '⊂': 'is a subset of', '⊆': 'is a subset of', '∪': 'union', '∩': 'intersection', '∅': 'the empty set',
  '∞': 'infinity', '∠': 'angle', '△': 'triangle', '∥': 'is parallel to', '⊥': 'is perpendicular to',
  '∴': 'therefore', '∵': 'because', '∀': 'for all', '∃': 'there exists', '∂': 'partial', '∇': 'del',
  '°': 'degrees', '∘': 'degrees', '%': 'per cent', '!': 'factorial', ',': ',', ';': ';', ':': 'ratio',
  '′': 'prime', '″': 'double prime', '…': 'dot dot dot', '⋯': 'dot dot dot', '.': '', '|': 'divides',
};

/**
 * Resolve brackets and bars inside a row, then turn leftover chars into ops.
 * Shared by the LaTeX parser and the MathML reader.
 */
export function finalizeRow(nodes: MNode[]): MNode {
  const closeOf: Record<string, string> = { '(': ')', '[': ']', '{': '}', '⟨': '⟩' };
  const isCh = (n: MNode | undefined, v: string) => !!n && n.t === 'ch' && n.v === v;
  // A closing bracket may carry a script: (x+1)^2 parses as scr(base=')')
  const closesWith = (n: MNode, v: string) => isCh(n, v) || (n.t === 'scr' && isCh(n.base, v));

  const out: MNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n.t === 'ch' && closeOf[n.v]) {
      const close = closeOf[n.v];
      let depth = 0;
      let j = i + 1;
      for (; j < nodes.length; j++) {
        if (isCh(nodes[j], n.v)) depth++;
        else if (closesWith(nodes[j], close)) {
          if (depth === 0) break;
          depth--;
        }
      }
      if (j < nodes.length) {
        const inner = finalizeRow(nodes.slice(i + 1, j));
        const fenced: MNode = { t: 'fenced', open: n.v, close, c: inner };
        const end = nodes[j];
        out.push(end.t === 'scr' ? { ...end, base: fenced } : fenced);
        i = j;
        continue;
      }
    }
    if (n.t === 'ch' && n.v === '|') {
      const j = nodes.findIndex((m, k) => k > i && closesWith(m, '|'));
      if (j > i) {
        const abs: MNode = { t: 'abs', c: finalizeRow(nodes.slice(i + 1, j)) };
        const end = nodes[j];
        out.push(end.t === 'scr' ? { ...end, base: abs } : abs);
        i = j;
        continue;
      }
    }
    out.push(n);
  }
  // leftover chars → operators (a stray ')' etc. becomes silent)
  const resolved = out.map((n): MNode => {
    if (n.t !== 'ch') return n;
    if ('()[]{}⟨⟩'.includes(n.v)) return { t: 'op', v: '' };
    return { t: 'op', v: CHAR_OPS[n.v] ?? n.v };
  });
  return resolved.length === 1 ? resolved[0] : { t: 'row', c: resolved };
}

const isSimple = (n: MNode): boolean => {
  switch (n.t) {
    case 'num':
    case 'id':
    case 'raw':
      return true;
    case 'text':
      return n.v.split(/\s+/).length <= 2;
    case 'row':
      return n.c.filter((c) => !(c.t === 'op' && !c.v)).length === 1 && isSimple(n.c[0]);
    case 'scr':
      return !n.sup && !!n.sub && isSimple(n.base) && isSimple(n.sub);
    default:
      return false;
  }
};

const flat = (n: MNode): string => (n.t === 'row' ? n.c.map(flat).join('') : 'v' in n ? String(n.v) : '');

export function speakMath(node: MNode, opts: MathSpeechOptions = {}): string {
  const letters = opts.letterNames ?? {};
  const say = (n: MNode): string => s(n).replace(/\s+/g, ' ').trim();

  function spellId(v: string): string {
    if (GREEK[v]) return GREEK[v];
    return [...v].map((ch) => letters[ch] ?? ch).join(' ');
  }

  function power(sup: MNode): string {
    const raw = flat(sup).replace('−', '-');
    if (raw === '2') return 'squared';
    if (raw === '3') return 'cubed';
    if (/^(°|∘|\\circ|degrees)$/.test(raw) || (sup.t === 'op' && sup.v === 'degrees')) return 'degrees';
    if (sup.t === 'op' && /prime/.test(sup.v)) return sup.v;
    if (raw === '′' || raw === "'") return 'prime';
    if (raw === '*') return 'star';
    if (isSimple(sup)) return `to the power of ${say(sup)}`;
    // "-1", "-2" are a row [minus, 1] – still short enough not to need "end power"
    if (sup.t === 'row' && sup.c.length === 2 && sup.c[0].t === 'op' && sup.c[0].v === 'minus' && isSimple(sup.c[1]))
      return `to the power of minus ${say(sup.c[1])}`;
    return `to the power of ${say(sup)}, end power,`;
  }

  function s(n: MNode): string {
    switch (n.t) {
      case 'num':
        return n.v.replace(/^-/, 'minus ');
      case 'id':
        return n.word ? n.v : spellId(n.v);
      case 'ch':
        return CHAR_OPS[n.v] ?? n.v;
      case 'op':
      case 'fn':
      case 'raw':
        return n.v;
      case 'text':
        return n.v;
      case 'row':
        return speakRow(n.c);
      case 'fenced': {
        if (isSimple(n.c)) return s(n.c);
        const name = n.open === '[' ? 'square bracket' : n.open === '{' ? 'brace' : 'bracket';
        return `open ${name}, ${s(n.c)}, close ${name},`;
      }
      case 'abs':
        return isSimple(n.c) ? `the absolute value of ${s(n.c)}` : `the absolute value of, ${s(n.c)}, end absolute value,`;
      case 'frac': {
        if (isSimple(n.n) && isSimple(n.d)) return `${s(n.n)} over ${s(n.d)}`;
        return `the fraction, ${s(n.n)}, over, ${s(n.d)}, end fraction,`;
      }
      case 'binom':
        return `${s(n.n)} choose ${s(n.k)}`;
      case 'sqrt': {
        const idx = n.idx ? flat(n.idx) : '2';
        const lead = idx === '2' ? 'the square root of' : `the ${ordinal(idx)} root of`;
        return isSimple(n.b) ? `${lead} ${s(n.b)}` : `${lead}, ${s(n.b)}, end root,`;
      }
      case 'scr': {
        const base = n.base;
        let out = s(base);
        if (n.sub) {
          const isLog = base.t === 'fn' && /log/.test(base.v);
          out += isLog ? ` base ${s(n.sub)}` : isSimple(n.sub) ? ` sub ${s(n.sub)}` : ` sub, ${s(n.sub)}, end sub,`;
        }
        if (n.sup) out += ` ${power(n.sup)}`;
        return out;
      }
      case 'big': {
        const names = { sum: 'the sum', prod: 'the product', int: 'the integral', oint: 'the contour integral', lim: 'the limit' };
        if (n.op === 'lim') {
          const sub = n.sub ? say(n.sub).replace(/\bgives\b/g, 'approaches') : '';
          return sub ? `the limit as ${sub}, of` : 'the limit of';
        }
        let out = names[n.op];
        if (n.sub && n.sup) out += ` from ${s(n.sub)} to ${s(n.sup)}`;
        else if (n.sub) out += ` over ${s(n.sub)}`;
        return `${out} of`;
      }
      case 'accent': {
        const b = s(n.b);
        switch (n.a) {
          case 'vec':
          case 'overrightarrow':
            return `vector ${b}`;
          case 'overline':
            return n.b.t === 'id' && /^[A-Z]{2,}$/.test(n.b.v) ? `line ${b}` : `${b} bar`;
          case 'bar':
            return `${b} bar`;
          case 'hat':
          case 'widehat':
            return `${b} hat`;
          case 'dot':
            return `${b} dot`;
          case 'ddot':
            return `${b} double dot`;
          case 'tilde':
            return `${b} tilde`;
          case 'overset':
          default:
            return b;
        }
      }
      case 'table':
        return (
          'a matrix: ' +
          n.rows.map((r, i) => `row ${i + 1}: ${r.map(s).join(', ')}`).join('; ') +
          '; end matrix,'
        );
    }
  }

  function speakRow(c: MNode[]): string {
    const parts: string[] = [];
    for (let i = 0; i < c.length; i++) {
      const n = c[i];
      const prev = c[i - 1];
      // number followed by a unit written as \text{cm} / \mathrm{kg} / <mi>cm</mi>
      if ((n.t === 'text' || n.t === 'id') && prev?.t === 'num' && UNITS[n.v.trim()]) {
        const def = UNITS[n.v.trim()];
        parts.push(prev.v === '1' ? def.one : def.many);
        continue;
      }
      // a leading minus reads better as "minus 5" than " minus 5" – handled by join
      parts.push(s(n));
    }
    return parts.filter(Boolean).join(' ');
  }

  return say(node)
    .replace(/\s+,/g, ',')
    .replace(/,(\s*,)+/g, ',')
    .replace(/^,\s*|,\s*$/g, '')
    .trim();
}

export { CHAR_OPS, FUNCTIONS };
