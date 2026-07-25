import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechParserService {
  private isEngineReady = false;
  private engineSetupFailed = false;
  private engineSetupPromise: Promise<any>;
  private cache = new Map<string, string>();
  private sre: any;

  constructor() {
    let baseHref = '/';

    if (typeof document !== 'undefined') {
      baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    }

    const mathmapsUrl = baseHref.endsWith('/') ? `${baseHref}mathmaps/` : `${baseHref}/mathmaps/`;

    (window as any).SREfeature = {
      custom: (loc: string) => {
        const url = `${mathmapsUrl}${loc}.json`;
        return fetch(url).then(res => {
          if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
          return res.text();
        });
      },
      domain: 'clearspeak', 
      style: 'default',
      locale: 'en'
    };

    this.engineSetupPromise = (async () => {
      const sreModule = await import('speech-rule-engine');
      this.sre = sreModule.default || sreModule;
      
      await this.sre.setupEngine((window as any).SREfeature);
      await this.sre.engineReady();
      this.isEngineReady = true;
    })().catch((err: any) => {
      console.error('Failed to setup speech rule engine:', err);
    });
  }

  public async parseHtmlForSpeech(html: string, parseEmphasis: boolean = false): Promise<string> {
    if (!html) return '';

    const cacheKey = html + '_' + parseEmphasis;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Wait for the engine to be ready if it's not already
    if (!this.isEngineReady && !this.engineSetupFailed) {
      try {
        await Promise.race([
          this.engineSetupPromise,
          new Promise((_, reject) => setTimeout(() => reject(new Error('SRE Initialization Timeout')), 5000))
        ]);
      } catch (e) {
        console.warn('Speech Rule Engine setup failed or timed out:', e);
        this.engineSetupFailed = true;
      }
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Fallback 1: If an HTML sanitizer stripped the <math> tag but left the raw LaTeX inside .katex-mathml
    const katexMathmlElements = doc.querySelectorAll('.katex-mathml');
    for (let i = 0; i < katexMathmlElements.length; i++) {
      const el = katexMathmlElements[i];
      if (el.querySelectorAll('math').length === 0) {
        let latex = el.textContent || '';
        if (latex.trim()) {
          latex = latex.replace(/\t/g, '\\t').replace(/ext\{/g, '\\text{');
          try {
            const katexModule = await import('katex');
            const mathmlHtml = katexModule.default.renderToString(latex, { output: 'mathml' });
            el.innerHTML = mathmlHtml;
          } catch(e) { }
        }
      }
    }

    // Find all math elements directly
    let mathElements = Array.from(doc.querySelectorAll('math'));

    // Fallback: If no math elements were found but we have data-latex, use KaTeX to generate MathML
    if (mathElements.length === 0) {
      const latexContainers = doc.querySelectorAll('.math-expression[data-latex], .math-inline[data-latex]');
      
      for (let i = 0; i < latexContainers.length; i++) {
        const container = latexContainers[i];
        let latex = container.getAttribute('data-latex');
        if (latex) {
          // Fix single backslash issues that turn \text into tab-ext
          latex = latex.replace(/\t/g, '\\t').replace(/ext\{/g, '\\text{');
          
          try {
            const katexModule = await import('katex');
            const mathmlHtml = katexModule.default.renderToString(latex, { output: 'mathml' });
            container.innerHTML = mathmlHtml;
          } catch(e) {
            console.warn('>>> SRE KaTeX fallback rendering failed:', e);
          }
        }
      }
      
      mathElements = Array.from(doc.querySelectorAll('math'));
    }

    for (let i = 0; i < mathElements.length; i++) {
      const mathEl = mathElements[i];
      const mathmlString = mathEl.outerHTML;
      
      try {
        const spokenText = this.sre.toSpeech(mathmlString);
        
        const mathContainer = mathEl.closest('.math-expression') || 
                              mathEl.closest('.math-inline') || 
                              mathEl.closest('.katex') || 
                              mathEl;

        const textNode = doc.createTextNode(' [SLOW] ' + spokenText + ' [NORMAL] ');
        if (mathContainer.parentNode) {
          mathContainer.parentNode.replaceChild(textNode, mathContainer);
        }
      } catch (e: any) {
        console.error('>>> SRE parsing error for element:', e);
      }
    }

    // Process emphasis tags if enabled
    let emphasisSummary = '';
    if (parseEmphasis) {
      const bolds: string[] = [];
      const italics: string[] = [];
      const underlines: string[] = [];
      const superscripts: string[] = [];
      const subscripts: string[] = [];

      doc.querySelectorAll('b, strong').forEach(el => {
        if (el.textContent?.trim()) bolds.push(el.textContent.trim());
      });
      doc.querySelectorAll('i, em').forEach(el => {
        if (el.textContent?.trim()) italics.push(el.textContent.trim());
      });
      doc.querySelectorAll('u').forEach(el => {
        if (el.textContent?.trim()) underlines.push(el.textContent.trim());
      });
      doc.querySelectorAll('sup').forEach(el => {
        if (el.textContent?.trim()) superscripts.push(el.textContent.trim());
      });
      doc.querySelectorAll('sub').forEach(el => {
        if (el.textContent?.trim()) subscripts.push(el.textContent.trim());
      });

      const summaries: string[] = [];
      if (bolds.length > 0) summaries.push(`bolded: ${bolds.join(', ')}`);
      if (italics.length > 0) summaries.push(`italicized: ${italics.join(', ')}`);
      if (underlines.length > 0) summaries.push(`underlined: ${underlines.join(', ')}`);
      if (superscripts.length > 0) summaries.push(`superscripted: ${superscripts.join(', ')}`);
      if (subscripts.length > 0) summaries.push(`subscripted: ${subscripts.join(', ')}`);

      if (summaries.length > 0) {
        emphasisSummary = ` In the Question text we just heard, the following words were ${summaries.join('. And ')}.`;
      }
    }

    // Add spaces around block elements to prevent paragraph mashing, and a full stop to force a natural pause
    const blockElements = doc.querySelectorAll('p, div, br, h1, h2, h3, h4, h5, h6, li, tr, td, th');
    blockElements.forEach(el => {
      el.insertAdjacentText('beforebegin', ' ');
      el.insertAdjacentText('afterend', '. ');
    });

    // Use textContent to naturally decode all HTML entities (like &nbsp;)
    const cleanText = (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
    const result = cleanText + emphasisSummary;
    this.cache.set(cacheKey, result);
    return result;
  }
}
