/** Word lists used by the normaliser. Edit freely – they are just data. */

export const ELEMENTS = new Set<string>([
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar',
  'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br',
  'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te',
  'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm',
  'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn',
  'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr',
  'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og',
  'R', // generic alkyl group in organic formulae (RCOOH, R-OH)
]);

/** Single elements that are commonly written alone with a count: O2, H2, Cl2, O3, P4, S8 … */
export const MOLECULAR_ELEMENTS = new Set(['H', 'N', 'O', 'F', 'Cl', 'Br', 'I', 'P', 'S']);

/** Formulae with no digit and no lowercase letter that are still unambiguous chemistry. */
export const FORMULA_WHITELIST = new Set(['KOH', 'HCN', 'HF', 'KI', 'KF', 'KCN', 'HI']);

/** Things that look like formulae but are not. */
export const FORMULA_STOPLIST = new Set(['BSc', 'MSc', 'HSc', 'BSc.', 'PhD', 'BEd', 'NCe', 'CoS']);

export const STATE_SYMBOLS: Record<string, string> = {
  aq: 'aqueous',
  s: 'solid',
  l: 'liquid',
  g: 'gas',
};

export const GREEK: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon', ϵ: 'epsilon', ζ: 'zeta', η: 'eta',
  θ: 'theta', ϑ: 'theta', ι: 'iota', κ: 'kappa', λ: 'lambda', μ: 'mu', µ: 'mu', ν: 'nu', ξ: 'xi',
  ο: 'omicron', π: 'pi', ρ: 'rho', σ: 'sigma', ς: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'phi',
  ϕ: 'phi', χ: 'chi', ψ: 'psi', ω: 'omega',
  Γ: 'capital gamma', Δ: 'delta', Θ: 'capital theta', Λ: 'capital lambda', Ξ: 'capital xi',
  Π: 'capital pi', Σ: 'capital sigma', Φ: 'capital phi', Ψ: 'capital psi', Ω: 'omega',
};

/** Symbols → words for plain (non-LaTeX) text. Spaces are padded by the caller. */
export const SYMBOLS: Record<string, string> = {
  '×': 'times', '✕': 'times', '·': 'times', '÷': 'divided by', '±': 'plus or minus', '∓': 'minus or plus',
  '≤': 'is less than or equal to', '⩽': 'is less than or equal to',
  '≥': 'is greater than or equal to', '⩾': 'is greater than or equal to',
  '≠': 'is not equal to', '≈': 'is approximately equal to', '≅': 'is congruent to',
  '≡': 'is identical to', '∝': 'is proportional to', '∞': 'infinity', '∼': 'is similar to',
  '∠': 'angle', '△': 'triangle', '∥': 'is parallel to', '⊥': 'is perpendicular to',
  '∈': 'is an element of', '∉': 'is not an element of', '⊂': 'is a subset of', '⊆': 'is a subset of',
  '∪': 'union', '∩': 'intersection', '∅': 'the empty set', 'ℝ': 'the real numbers',
  '∀': 'for all', '∃': 'there exists', '∴': 'therefore', '∵': 'because',
  '⇒': 'implies', '⇔': 'if and only if', '∂': 'partial', '∇': 'del',
  '∑': 'the sum of', '∏': 'the product of', '∫': 'the integral of',
  '‰': 'per mille', '′': 'prime', '″': 'double prime',
  '=': 'equals', '<': 'is less than', '>': 'is greater than', '+': 'plus', '@': 'at', '&': 'and',
};

/** ASCII spellings authors type in Word / plain editors. Longest first matters. */
export const ASCII_OPERATORS: [RegExp, string][] = [
  [/<=>|⇌|⇋|⇄/g, ' is in equilibrium with '],
  [/-{1,2}>|→|⟶|⟹/g, ' gives '],
  [/<-{1,2}|←/g, ' comes from '],
  [/<=|=</g, ' is less than or equal to '],
  [/>=|=>/g, ' is greater than or equal to '],
  [/!=|=\/=/g, ' is not equal to '],
  [/\+\/-|\+-(?=\s|\d)/g, ' plus or minus '],
  [/↑/g, ' gas given off '],
  [/↓/g, ' precipitate '],
];

export const UNICODE_FRACTIONS: Record<string, string> = {
  '½': '1 half', '⅓': '1 third', '⅔': '2 thirds', '¼': '1 quarter', '¾': '3 quarters',
  '⅕': '1 fifth', '⅖': '2 fifths', '⅗': '3 fifths', '⅘': '4 fifths', '⅙': '1 sixth',
  '⅚': '5 sixths', '⅛': '1 eighth', '⅜': '3 eighths', '⅝': '5 eighths', '⅞': '7 eighths',
};

export const SUPERSCRIPT_CHARS: Record<string, string> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  '⁺': '+', '⁻': '-', '⁼': '=', '⁽': '(', '⁾': ')', 'ⁿ': 'n', 'ˣ': 'x', 'ⁱ': 'i',
};
export const SUBSCRIPT_CHARS: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
  '₊': '+', '₋': '-', '₌': '=', '₍': '(', '₎': ')', 'ₓ': 'x', 'ₙ': 'n', 'ₐ': 'a', 'ₑ': 'e', 'ᵢ': 'i',
};

/**
 * Units recognised after a number. `kind: 'len'` units take "square/cubic" in
 * front when raised to 2/3 (cm³ → cubic centimetres); everything else takes
 * "squared/cubed" after (s² → seconds squared).
 */
export interface UnitDef { one: string; many: string; kind?: 'len' }
const u = (one: string, many = `${one}s`, kind?: 'len'): UnitDef => ({ one, many, kind });
export const UNITS: Record<string, UnitDef> = {
  km: u('kilometre', undefined, 'len'), m: u('metre', undefined, 'len'), cm: u('centimetre', undefined, 'len'),
  mm: u('millimetre', undefined, 'len'), dm: u('decimetre', undefined, 'len'),
  'µm': u('micrometre', undefined, 'len'), 'μm': u('micrometre', undefined, 'len'), nm: u('nanometre', undefined, 'len'),
  kg: u('kilogram'), g: u('gram'), mg: u('milligram'),
  s: u('second'), ms: u('millisecond'), min: u('minute'), mins: u('minute'), h: u('hour'), hr: u('hour'), hrs: u('hour'),
  N: u('newton'), kN: u('kilonewton'), J: u('joule'), kJ: u('kilojoule'), MJ: u('megajoule'),
  W: u('watt'), kW: u('kilowatt'), MW: u('megawatt'), kWh: u('kilowatt hour'),
  V: u('volt'), mV: u('millivolt'), kV: u('kilovolt'), mA: u('milliamp'),
  'Ω': u('ohm'), 'kΩ': u('kilohm'), 'MΩ': u('megohm'),
  F: u('farad'), 'µF': u('microfarad'), 'μF': u('microfarad'), nF: u('nanofarad'), pF: u('picofarad'),
  T: u('tesla'), mT: u('millitesla'), Wb: u('weber'), dB: u('decibel'), rad: u('radian'), lx: u('lux', 'lux'),
  Bq: u('becquerel'), 'µA': u('microamp'), 'μA': u('microamp'), 'Ωm': u('ohm metre'),
  Hz: u('hertz', 'hertz'), kHz: u('kilohertz', 'kilohertz'), MHz: u('megahertz', 'megahertz'),
  Pa: u('pascal'), kPa: u('kilopascal'), atm: u('atmosphere'), mmHg: u('millimetre of mercury', 'millimetres of mercury'),
  mol: u('mole'), K: u('kelvin', 'kelvin'), L: u('litre'), mL: u('millilitre'), ml: u('millilitre'),
  eV: u('electronvolt'), cal: u('calorie'), kcal: u('kilocalorie'), C: u('coulomb'),
};

export const ABBREVIATIONS: [RegExp, string][] = [
  [/\be\.g\.,?/gi, 'for example,'],
  [/\bi\.e\.,?/gi, 'that is,'],
  [/\betc\./gi, 'et cetera.'],
  [/\bvs\.?(?=\s)/gi, 'versus'],
  [/\bapprox\./gi, 'approximately'],
  [/\bw\.r\.t\.?/gi, 'with respect to'],
  [/\bFig\.(?=\s*\d)/g, 'Figure'],
  [/\bNo\.(?=\s*\d)/g, 'number'],
  [/\band\/or\b/gi, 'and, or'],
  [/\bpH\b/g, 'p H'],
  [/\bpOH\b/g, 'p O H'],
  [/\bpKa\b/g, 'p K a'],
];

/** All-caps words examiners use for emphasis. Spoken lower-case and emphasised. */
export const EMPHASIS_WORDS = [
  'NOT', 'EXCEPT', 'LEAST', 'MOST', 'BEST', 'INCORRECT', 'CORRECT', 'FALSE', 'TRUE',
  'NEVER', 'ALWAYS', 'ONLY', 'NONE', 'ALL', 'FIRST', 'LAST',
];

export const ROMAN: Record<string, string> = {
  I: '1', II: '2', III: '3', IV: '4', V: '5', VI: '6', VII: '7', VIII: '8', IX: '9', X: '10',
};

export const CURRENCY: Record<string, [string, string]> = {
  '₦': ['naira', 'naira'], '$': ['dollar', 'dollars'], '£': ['pound', 'pounds'], '€': ['euro', 'euros'],
};

export const FUNCTIONS: Record<string, string> = {
  sin: 'sine', cos: 'cosine', tan: 'tangent', sec: 'secant', csc: 'cosecant', cosec: 'cosecant', cot: 'cotangent',
  arcsin: 'inverse sine', arccos: 'inverse cosine', arctan: 'inverse tangent',
  sinh: 'hyperbolic sine', cosh: 'hyperbolic cosine', tanh: 'hyperbolic tangent',
  log: 'log', ln: 'natural log', lg: 'log', exp: 'exponential', max: 'max', min: 'min',
  det: 'determinant', gcd: 'G C D', lcm: 'L C M', mod: 'mod', dim: 'dimension',
};

export function ordinal(n: string): string {
  const map: Record<string, string> = { '2': 'square', '3': 'cube', '4': 'fourth', '5': 'fifth', '6': 'sixth', '7': 'seventh', '8': 'eighth', '9': 'ninth', '10': 'tenth', n: 'n-th' };
  return map[n] ?? `${n}-th`;
}

/** Element names by atomic number (index 0 = hydrogen). Used for nuclear notation. */
export const ELEMENT_NAMES = (
  'hydrogen helium lithium beryllium boron carbon nitrogen oxygen fluorine neon sodium magnesium aluminium silicon ' +
  'phosphorus sulphur chlorine argon potassium calcium scandium titanium vanadium chromium manganese iron cobalt nickel ' +
  'copper zinc gallium germanium arsenic selenium bromine krypton rubidium strontium yttrium zirconium niobium molybdenum ' +
  'technetium ruthenium rhodium palladium silver cadmium indium tin antimony tellurium iodine xenon caesium barium ' +
  'lanthanum cerium praseodymium neodymium promethium samarium europium gadolinium terbium dysprosium holmium erbium ' +
  'thulium ytterbium lutetium hafnium tantalum tungsten rhenium osmium iridium platinum gold mercury thallium lead ' +
  'bismuth polonium astatine radon francium radium actinium thorium protactinium uranium neptunium plutonium americium ' +
  'curium berkelium californium einsteinium fermium mendelevium nobelium lawrencium rutherfordium dubnium seaborgium ' +
  'bohrium hassium meitnerium darmstadtium roentgenium copernicium nihonium flerovium moscovium livermorium tennessine oganesson'
).split(' ');

export const ELEMENT_SYMBOLS_BY_Z = (
  'H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo ' +
  'Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl ' +
  'Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og'
).split(' ');

/**
 * IPA symbols → their names. We name the symbol rather than giving an example
 * word, because "as in thin" would give away the answer to a sound question.
 */
export const IPA_NAMES: [string, string][] = [
  ['tʃ', 't esh'], ['dʒ', 'd ezh'], ['ː', 'long'], ['ˈ', 'stress mark'], ['ˌ', 'secondary stress mark'],
  ['θ', 'theta'], ['ð', 'eth'], ['ʃ', 'esh'], ['ʒ', 'ezh'], ['ŋ', 'eng'], ['ə', 'schwa'], ['æ', 'ash'],
  ['ɑ', 'script a'], ['ɒ', 'turned script a'], ['ɔ', 'open o'], ['ʊ', 'upsilon'], ['ɪ', 'small capital I'],
  ['ʌ', 'turned v'], ['ɜ', 'reversed epsilon'], ['ɛ', 'epsilon'], ['ɐ', 'turned a'], ['ɹ', 'turned r'],
  ['ɾ', 'flap r'], ['ʔ', 'glottal stop'], ['ɡ', 'g'], ['ʤ', 'd ezh'], ['ʧ', 't esh'],
];
export const IPA_SPECIFIC = /[θðʃʒŋəæɑɒɔʊɪʌɜɛɐɹɾʔːˈˌʤʧ]/;

/** Accounting shorthand – only applied when the item looks like an accounting item. */
export const ACCOUNTING_ABBREVIATIONS: [RegExp, string][] = [
  [/\bb\/d\b/gi, 'brought down'],
  [/\bc\/d\b/gi, 'carried down'],
  [/\bb\/f\b/gi, 'brought forward'],
  [/\bc\/f\b/gi, 'carried forward'],
  [/\ba\/c\b/gi, 'account'],
  // "Dr Cash a/c" is debit; "Dr. Okafor" (with a full stop before a name) stays a title
  [/\bDr\b(?!\.\s+[A-Z])\.?/g, 'debit'],
  [/\bCr\b(?!\.\s+[A-Z])\.?/g, 'credit'],
];
export const ACCOUNTING_CONTEXT = /\b(Dr|Cr|debit|credit|ledger|journal|trial balance|cash ?book|balance sheet|income statement|profit|loss|depreciation|capital account|b\/d|c\/d|b\/f|c\/f)\b/i;
export const RATIO_CONTEXT = /\b(ratio|scale|proportion|share[ds]?|phenotypic|genotypic|offspring|map)\b/i;
export const GENETICS_CONTEXT = /\b(genotypes?|phenotypes?|alleles?|heterozygous|homozygous|dominant|recessive|crossed|cross|offspring|F[12]|monohybrid|dihybrid|sex-linked)\b/i;
export const STRESS_CONTEXT = /\b(stress(ed)?|capitals?|capitalised|syllables?)\b/i;
export const SOUND_CONTEXT = /\b(sounds?|vowels?|consonants?|phonetic|transcription|rhymes?|pronounced)\b/i;

/** Distinctive characters for auto-detecting Nigerian-language text without a lang attribute. */
export const LANGUAGE_HINTS: { lang: string; chars: RegExp }[] = [
  { lang: 'ha', chars: /[ɓɗƙƴƁƊƘ]/g },
  { lang: 'ig', chars: /[ịụṅỊỤṄ]/g },
  { lang: 'yo', chars: /[ẹọṣẸỌṢ]/g },
];
