/**
 * MathML → speech. Handles hand-written MathML, and the MathML that KaTeX and
 * MathJax embed for accessibility. If a TeX annotation is present we prefer
 * it, because the LaTeX parser has more context than presentation MathML.
 */
import { finalizeRow, MNode, speakMath } from './math-speech';
import { latexToAst, LatexOptions } from './latex';
import { FUNCTIONS, GREEK } from './lexicon';

const BIG_CHARS: Record<string, 'sum' | 'prod' | 'int' | 'oint' | 'lim'> = {
  '∑': 'sum', '∏': 'prod', '∫': 'int', '∬': 'int', '∮': 'oint', lim: 'lim',
};
const ACCENT_CHARS: Record<string, string> = {
  '→': 'vec', '⃗': 'vec', '¯': 'bar', '‾': 'overline', '―': 'overline', '^': 'hat', 'ˆ': 'hat', '˙': 'dot', '¨': 'ddot', '~': 'tilde', '˜': 'tilde',
};

const kids = (el: Element) => Array.from(el.children);
const text = (el: Element) => (el.textContent ?? '').trim();

export function mathmlToAst(el: Element, opts: LatexOptions = {}): MNode {
  const tag = (el.localName || el.nodeName).toLowerCase().replace(/^m:/, '');
  const c = kids(el);
  const row = (els: Element[]) => finalizeRow(els.map((e) => mathmlToAst(e, opts)));

  switch (tag) {
    case 'semantics': {
      const tex = c.find((k) => k.localName === 'annotation' && /tex/i.test(k.getAttribute('encoding') ?? ''));
      if (tex) return latexToAst(text(tex), opts);
      return c[0] ? mathmlToAst(c[0], opts) : { t: 'text', v: '' };
    }
    case 'annotation':
    case 'annotation-xml':
    case 'mphantom':
    case 'mprescripts':
    case 'none':
      return { t: 'op', v: '' };
    case 'mi': {
      const v = text(el);
      if (FUNCTIONS[v]) return { t: 'fn', v: FUNCTIONS[v] };
      if (GREEK[v]) return { t: 'id', v: GREEK[v], word: true };
      if (v === 'lim') return { t: 'big', op: 'lim' };
      return v.length > 1 && /^[a-z]+$/.test(v) ? { t: 'text', v } : { t: 'id', v };
    }
    case 'mn':
      return { t: 'num', v: text(el) };
    case 'mo': {
      const v = text(el);
      if (BIG_CHARS[v]) return { t: 'big', op: BIG_CHARS[v] };
      if (v === '\u2061' || v === '\u2062' || v === '\u2063' || v === '') return { t: 'op', v: '' }; // invisible apply/times/sep
      if (v === '-') return { t: 'ch', v: '−' };
      return { t: 'ch', v };
    }
    case 'mtext':
    case 'ms':
      return { t: 'text', v: text(el) };
    case 'mspace':
      return { t: 'op', v: '' };
    case 'mfrac':
      return { t: 'frac', n: mathmlToAst(c[0], opts), d: mathmlToAst(c[1], opts) };
    case 'msqrt':
      return { t: 'sqrt', b: row(c) };
    case 'mroot':
      return { t: 'sqrt', b: mathmlToAst(c[0], opts), idx: mathmlToAst(c[1], opts) };
    case 'msup':
    case 'msub':
    case 'msubsup':
    case 'munder':
    case 'mover':
    case 'munderover': {
      const base = mathmlToAst(c[0], opts);
      const a = c[1] ? mathmlToAst(c[1], opts) : undefined;
      const b = c[2] ? mathmlToAst(c[2], opts) : undefined;
      const isUnder = tag === 'msub' || tag === 'munder';
      const isOver = tag === 'msup' || tag === 'mover';
      const sub = isUnder || tag === 'msubsup' || tag === 'munderover' ? a : undefined;
      const sup = isOver ? a : b;
      if (tag === 'mover' && c[1] && ACCENT_CHARS[text(c[1])]) {
        return { t: 'accent', a: ACCENT_CHARS[text(c[1])], b: base };
      }
      if (base.t === 'big') return { ...base, sub, sup };
      return { t: 'scr', base, sub, sup };
    }
    case 'mfenced': {
      const open = el.getAttribute('open') ?? '(';
      const close = el.getAttribute('close') ?? ')';
      const inner = finalizeRow(c.flatMap((k, i) => [...(i ? [{ t: 'op', v: ',' } as MNode] : []), mathmlToAst(k, opts)]));
      return open === '|' ? { t: 'abs', c: inner } : { t: 'fenced', open, close, c: inner };
    }
    case 'mtable':
      return {
        t: 'table',
        rows: c.map((tr) => kids(tr).map((td) => row(kids(td)))),
      };
    case 'menclose': {
      const r = row(c);
      return (el.getAttribute('notation') ?? '').includes('radical') ? { t: 'sqrt', b: r } : r;
    }
    default:
      // math, mrow, mstyle, mpadded, merror, mtd, … → treat as a row
      return row(c);
  }
}

export function mathmlToSpeech(el: Element, opts: LatexOptions = {}): string {
  // Authors (or MathJax) sometimes supply a hand-written spoken form.
  const alt = el.getAttribute('alttext') ?? el.getAttribute('aria-label');
  if (alt && !/\\[a-z]/i.test(alt)) return alt;
  try {
    return speakMath(mathmlToAst(el, opts), opts);
  } catch {
    return text(el);
  }
}
