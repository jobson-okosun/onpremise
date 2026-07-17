import { Injectable } from '@angular/core';
import * as sre from 'speech-rule-engine';

@Injectable({
  providedIn: 'root'
})
export class SpeechParserService {
  private isEngineReady = false;
  private engineSetupPromise: Promise<any>;

  constructor() {
    this.engineSetupPromise = sre.setupEngine({
      json: '/mathmaps/',
      domain: 'clearspeak', 
      style: 'default',
      locale: 'en'
    }).then(() => { 
      return sre.engineReady();
    }).then(() => {
      this.isEngineReady = true;
    }).catch((err: any) => {
      console.error('Failed to setup speech rule engine:', err);
    });
  }

  public async parseHtmlForSpeech(html: string, parseEmphasis: boolean = false): Promise<string> {
    if (!html) return '';

    // Wait for the engine to be ready if it's not already
    if (!this.isEngineReady) {
      await this.engineSetupPromise;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find all katex math elements
    const mathElements = doc.querySelectorAll('.katex-mathml math');
    
    for (let i = 0; i < mathElements.length; i++) {
      const mathEl = mathElements[i];
      const mathmlString = mathEl.outerHTML;
      
      try {
        const spokenText = sre.toSpeech(mathmlString);
        
        const mathContainer = mathEl.closest('.math-expression') || 
                              mathEl.closest('.math-inline') || 
                              mathEl.closest('.katex') || 
                              mathEl;

        // Replace it with the spoken text
        // We wrap math equations in speed markers so the TTS engine can read them slower!
        const textNode = doc.createTextNode(' [SLOW] ' + spokenText + ' [NORMAL] ');
        if (mathContainer.parentNode) {
          mathContainer.parentNode.replaceChild(textNode, mathContainer);
        }
      } catch (e) {
        console.error('SRE parsing error for element:', mathEl, e);
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

    // Add spaces around block elements to prevent paragraph mashing
    const blockElements = doc.querySelectorAll('p, div, br, h1, h2, h3, h4, h5, h6, li, tr, td, th');
    blockElements.forEach(el => {
      el.insertAdjacentText('beforebegin', ' ');
      el.insertAdjacentText('afterend', ' ');
    });

    // Use textContent to naturally decode all HTML entities (like &nbsp;)
    const cleanText = (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
    return cleanText + emphasisSummary
  }
}
