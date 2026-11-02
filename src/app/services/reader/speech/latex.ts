/**
 * Small, forgiving LaTeX → speech converter covering what shows up in exam
 * items: fractions, powers, roots, trig/log, Greek, sums/integrals/limits,
 * matrices, accents, \text{}, units and mhchem's \ce{}.
 * It never throws – unknown commands are read out by name.
 */
import { finalizeRow, MNode, speakMath, MathSpeechOptions } from './math-speech';
import { FUNCTIONS } from './lexicon';

type Tok = { k: 'cmd' | 'ch' | 'num' | 'letter' | '{' | '}' | '^' | '_' | '&'; v: string; start: number; end: number };

const GREEK_CMDS = [
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon', 'zeta', 'eta', 'theta', 'vartheta', 'iota', 'kappa',
  'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'varpi', 'rho', 'varrho', 'sigma', 'varsigma', 'tau', 'upsilon', 'phi',
  'varphi', 'chi', 'psi', 'omega',
];
const GREEK_UPPER = ['Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi', 'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega'];

/** Commands that map to a single char handled by finalizeRow / CHAR_OPS. */
const CMD_CHARS: Record<string, string> = {
  times: '×', cdot: '·', div: '÷', pm: '±', mp: '∓', le: '≤', leq: '≤', leqslant: '≤', ge: '≥', geq: '≥', geqslant: '≥',
  ne: '≠', neq: '≠', approx: '≈', equiv: '≡', sim: '∼', cong: '≅', propto: '∝', infty: '∞',
  rightarrow: '→', longrightarrow: '→', leftarrow: '←', Rightarrow: '⇒', implies: '⇒', Leftrightarrow: '⇔', iff: '⇔',
  leftrightarrow: '↔', rightleftharpoons: '⇌', rightleftarrows: '⇌', in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆',
  cup: '∪', cap: '∩', emptyset: '∅', varnothing: '∅', forall: '∀', exists: '∃', angle: '∠', triangle: '△',
  parallel: '∥', perp: '⊥', circ: '∘', degree: '°', prime: '′', ldots: '…', cdots: '…', dots: '…', therefore: '∴',
  because: '∵', partial: '∂', nabla: '∇', '%': '%', '{': '{', '}': '}', '|': '∥', lvert: '|', rvert: '|', vert: '|',
  langle: '⟨', rangle: '⟩', lbrace: '{', rbrace: '}', mid: '|', ast: '*', colon: ':', lt: '<', gt: '>',
};
const CMD_OPS: Record<string, string> = {
  to: 'approaches', mapsto: 'maps to', gets: 'comes from', neg: 'not', land: 'and', lor: 'or', wedge: 'and', vee: 'or',
  setminus: 'minus', bmod: 'mod', pmod: 'mod', cdotp: 'times', $: 'dollars', '#': 'number', '&': 'and',
};
const BIG: Record<string, 'sum' | 'prod' | 'int' | 'lim' | 'oint'> = {
  sum: 'sum', prod: 'prod', int: 'int', iint: 'int', iiint: 'int', oint: 'oint', lim: 'lim', limsup: 'lim', liminf: 'lim',
};
const TEXT_CMDS = new Set(['text', 'textrm', 'textit', 'textbf', 'textnormal', 'mbox', 'mathrm', 'operatorname', 'textsf', 'texttt', 'mathrm']);
const STYLE_CMDS = new Set(['mathbf', 'mathbb', 'mathcal', 'mathit', 'mathsf', 'mathtt', 'boldsymbol', 'bm', 'mathfrak', 'displaystyle', 'textstyle', 'underline', 'boxed', 'cancel', 'color']);
const ACCENTS = new Set(['vec', 'bar', 'hat', 'widehat', 'dot', 'ddot', 'tilde', 'widetilde', 'overline', 'overrightarrow']);
const SKIP = new Set([',', ';', ':', '!', ' ', 'quad', 'qquad', 'enspace', 'thinspace', 'nonumber', 'limits', 'nolimits', 'left.', 'right.']);
const DELIM_SIZERS = new Set(['left', 'right', 'big', 'Big', 'bigg', 'Bigg', 'bigl', 'bigr', 'Bigl', 'Bigr', 'biggl', 'biggr', 'middle']);

function tokenize(src: string): Tok[] {
  const re = /\\([a-zA-Z]+)\*?|\\(.)|(\d+(?:\.\d+)?|\.\d+)|([a-zA-Z])|(\s+)|(.)/gsy;
  const toks: Tok[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const [all, cmd, sym, num, letter, ws, ch] = m;
    const start = m.index;
    const end = start + all.length;
    if (ws) continue;
    if (cmd) toks.push({ k: 'cmd', v: cmd, start, end });
    else if (sym !== undefined) toks.push({ k: 'cmd', v: sym === '\\' ? '\\\\' : sym, start, end });
    else if (num) toks.push({ k: 'num', v: num, start, end });
    else if (letter) toks.push({ k: 'letter', v: letter, start, end });
    else if (ch === '{' || ch === '}' || ch === '^' || ch === '_' || ch === '&') toks.push({ k: ch, v: ch, start, end });
    else if (ch === "'") toks.push({ k: 'ch', v: '′', start, end });
    else toks.push({ k: 'ch', v: ch, start, end });
  }
  return toks;
}

export interface LatexOptions extends MathSpeechOptions {
  /** Used for \ce{…}/\pu{…}; supplied by the normaliser to avoid a circular import. */
  chem?: (src: string) => string;
}

export function latexToAst(src: string, opts: LatexOptions = {}): MNode {
  const toks = tokenize(src);
  let pos = 0;
  const peek = () => toks[pos];

  /** Raw source text inside the brace group that starts at the current token. */
  function rawGroup(): string {
    const t = peek();
    if (!t || t.k !== '{') {
      pos++;
      return t ? t.v : '';
    }
    let depth = 0;
    const start = t.end;
    for (; pos < toks.length; pos++) {
      if (toks[pos].k === '{') depth++;
      else if (toks[pos].k === '}' && --depth === 0) {
        const end = toks[pos].start;
        pos++;
        return src.slice(start, end);
      }
    }
    return src.slice(start);
  }

  function parseRow(stop: (t: Tok) => boolean): MNode {
    const nodes: MNode[] = [];
    while (pos < toks.length && !stop(toks[pos])) {
      const n = parseScripted();
      if (n) nodes.push(n);
    }
    return finalizeRow(nodes);
  }

  function parseArg(): MNode {
    const t = peek();
    if (!t) return { t: 'text', v: '' };
    if (t.k === '{') {
      pos++;
      const r = parseRow((x) => x.k === '}');
      pos++; // consume }
      return r;
    }
    // x^23 means x^{2}3 – split multi-digit numbers in unbraced arguments
    if (t.k === 'num' && t.v.length > 1) {
      const first = t.v[0];
      t.v = t.v.slice(1);
      return { t: 'num', v: first };
    }
    return parseAtom() ?? { t: 'text', v: '' };
  }

  function parseScripted(): MNode | null {
    let atom = parseAtom();
    if (!atom) return null;
    let sub: MNode | undefined;
    let sup: MNode | undefined;
    while (peek() && (peek().k === '^' || peek().k === '_')) {
      const k = toks[pos++].k;
      const arg = parseArg();
      if (k === '^') sup = arg;
      else sub = arg;
    }
    // apostrophes after an atom: f'(x)
    while (peek() && peek().k === 'ch' && peek().v === '′') {
      pos++;
      sup = { t: 'op', v: sup?.t === 'op' && sup.v === 'prime' ? 'double prime' : 'prime' };
    }
    if (!sub && !sup) return atom;
    if (atom.t === 'big') return { ...atom, sub, sup };
    return { t: 'scr', base: atom, sub, sup };
  }

  function parseEnv(name: string): MNode {
    const rows: MNode[][] = [[]];
    let cell: MNode[] = [];
    const pushCell = () => {
      rows[rows.length - 1].push(finalizeRow(cell));
      cell = [];
    };
    if (name === 'array') rawGroup(); // column spec {cc|c}
    while (pos < toks.length) {
      const t = peek();
      if (t.k === 'cmd' && t.v === 'end') {
        pos++;
        rawGroup();
        break;
      }
      if (t.k === '&') {
        pos++;
        pushCell();
        continue;
      }
      if (t.k === 'cmd' && t.v === '\\\\') {
        pos++;
        pushCell();
        rows.push([]);
        continue;
      }
      const n = parseScripted();
      if (n) cell.push(n);
    }
    pushCell();
    const clean = rows.filter((r) => r.some((c) => !(c.t === 'row' && c.c.length === 0)));
    if (/^(aligned|align|gather|gathered|split|eqnarray|equation)\*?$/.test(name)) {
      return { t: 'row', c: clean.flatMap((r, i) => [...(i ? [{ t: 'op', v: ';' } as MNode] : []), ...r]) };
    }
    if (name === 'cases') {
      return { t: 'raw', v: 'cases: ' + clean.map((r) => r.map((c) => speakMath(c, opts)).join(' when ')).join('; ') + ', end cases,' };
    }
    const table: MNode = { t: 'table', rows: clean };
    if (name === 'vmatrix') return { t: 'row', c: [{ t: 'op', v: 'the determinant of' }, table] };
    return table;
  }

  function parseAtom(): MNode | null {
    const t = toks[pos++];
    if (!t) return null;
    switch (t.k) {
      case '{': {
        const r = parseRow((x) => x.k === '}');
        pos++;
        return r;
      }
      case '}':
        return null;
      case 'num':
        return { t: 'num', v: t.v };
      case 'letter':
        return { t: 'id', v: t.v };
      case 'ch':
        return { t: 'ch', v: t.v };
      case '&':
        return { t: 'op', v: ',' };
      case '^':
      case '_':
        return null;
      case 'cmd':
        return command(t.v);
    }
  }

  function command(name: string): MNode | null {
    if (SKIP.has(name)) return null;
    if (name === '\\\\') return { t: 'op', v: ';' };
    if (DELIM_SIZERS.has(name)) {
      const d = toks[pos++];
      if (!d) return null;
      if (d.k === 'ch') return d.v === '.' ? null : { t: 'ch', v: d.v };
      if (d.k === 'cmd') return CMD_CHARS[d.v] ? { t: 'ch', v: CMD_CHARS[d.v] === '∥' ? '|' : CMD_CHARS[d.v] } : null;
      return null;
    }
    if (/^[dtc]?frac$/.test(name)) {
      const n = parseArg();
      const d = parseArg();
      return { t: 'frac', n, d };
    }
    if (/^[dt]?binom$/.test(name)) {
      const n = parseArg();
      const k = parseArg();
      return { t: 'binom', n, k };
    }
    if (name === 'sqrt') {
      let idx: MNode | undefined;
      if (peek()?.k === 'ch' && peek().v === '[') {
        pos++;
        idx = parseRow((x) => x.k === 'ch' && x.v === ']');
        pos++;
      }
      return { t: 'sqrt', idx, b: parseArg() };
    }
    if (name === 'ce' || name === 'pu') {
      const raw = rawGroup();
      return { t: 'raw', v: opts.chem ? opts.chem(raw) : raw };
    }
    if (TEXT_CMDS.has(name)) {
      const raw = rawGroup().replace(/\\[,;: ]/g, ' ');
      if ((name === 'mathrm' || name === 'operatorname') && /^[a-zA-Z]$/.test(raw.trim())) return { t: 'id', v: raw.trim() };
      if (name === 'operatorname' && FUNCTIONS[raw.trim()]) return { t: 'fn', v: FUNCTIONS[raw.trim()] };
      return { t: 'text', v: raw };
    }
    if (STYLE_CMDS.has(name)) {
      if (name === 'color') rawGroup();
      if (name === 'displaystyle' || name === 'textstyle') return null;
      return parseArg();
    }
    if (ACCENTS.has(name)) {
      const b = parseArg();
      return { t: 'accent', a: name, b: b.t === 'row' && b.c.every((c) => c.t === 'id') ? { t: 'id', v: b.c.map((c) => (c as { v: string }).v).join('') } : b };
    }
    if (name === 'overset' || name === 'stackrel') {
      const over = parseArg();
      const base = parseArg();
      const overTxt = speakMath(over, opts);
      return { t: 'row', c: [base, { t: 'raw', v: overTxt ? `, with ${overTxt} above,` : '' }] };
    }
    if (name === 'begin') {
      return parseEnv(rawGroup().trim());
    }
    if (GREEK_CMDS.includes(name)) return { t: 'id', v: name.replace(/^var/, ''), word: true };
    if (GREEK_UPPER.includes(name)) return { t: 'id', v: name === 'Delta' || name === 'Omega' ? name.toLowerCase() : `capital ${name.toLowerCase()}`, word: true };
    if (CMD_CHARS[name]) return { t: 'ch', v: CMD_CHARS[name] };
    if (CMD_OPS[name]) return { t: 'op', v: CMD_OPS[name] };
    if (BIG[name]) return { t: 'big', op: BIG[name] };
    if (FUNCTIONS[name]) return { t: 'fn', v: FUNCTIONS[name] };
    if (name === 'not') {
      const n = parseAtom();
      return { t: 'row', c: [{ t: 'op', v: 'not' }, ...(n ? [n] : [])] };
    }
    if (name === 'hline' || name === 'label' || name === 'tag') {
      if (name !== 'hline') rawGroup();
      return null;
    }
    // Unknown: read its name so nothing silently disappears
    return { t: 'text', v: name };
  }

  return parseRow(() => false);
}

export function latexToSpeech(src: string, opts: LatexOptions = {}): string {
  try {
    return speakMath(latexToAst(src, opts), opts);
  } catch {
    // Never let a malformed item break the exam – fall back to stripped source.
    return src.replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}^_\\$]/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
