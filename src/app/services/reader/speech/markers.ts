/**
 * Private-use Unicode characters used as in-band markers while the
 * normaliser works on a flat string. They never reach the speech engine.
 */
export const SUB_O = ''; // start of subscript
export const SUP_O = ''; // start of superscript
export const S_CLOSE = ''; // end of sub/sup
export const PROT_O = ''; // start of already-final speech (do not touch)
export const PROT_C = ''; // end of protected speech
export const EM_O = ''; // start of emphasis
export const EM_C = ''; // end of emphasis
export const BREAK = ''; // sentence / block boundary (natural pause)
export const LANG_O = ''; // start of foreign-language span: LANG_O + "fr" + LANG_SEP + text + LANG_C
export const LANG_SEP = '';
export const LANG_C = '';
export const U_O = ''; // start of underlined text
export const U_C = ''; // end of underlined text

export const protect = (spoken: string) => `${PROT_O}${spoken}${PROT_C}`;

/**
 * Apply `fn` only to the parts of `s` that are NOT inside PROT_O…PROT_C.
 * Every pipeline step goes through this, so text that one step has already
 * turned into final speech (e.g. a formula) is never re-processed by a
 * later step (e.g. the units step turning "2 m" into "2 metres").
 */
export function outsideProtected(s: string, fn: (part: string) => string): string {
  const re = new RegExp(`(${PROT_O}[^${PROT_C}]*${PROT_C})`, 'g');
  return s
    .split(re)
    .map((part) => (part.startsWith(PROT_O) ? part : fn(part)))
    .join('');
}
