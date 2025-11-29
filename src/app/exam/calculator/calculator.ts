import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator {
  display = signal('');
  result = signal('');

  isOperator(v: string): boolean {
    return ['+', '-', '*', '/'].includes(v);
  }

  getLastOperand(): string {
    const exp = this.display();
    let pos = Math.max(
      exp.lastIndexOf('+'),
      exp.lastIndexOf('-'),
      exp.lastIndexOf('*'),
      exp.lastIndexOf('/')
    );
    return exp.substring(pos + 1);
  }

  append(value: string) {
    const exp = this.display();
    const last = exp.slice(-1);

    // 1. Prevent multiple decimals in a single operand
    if (value === '.') {
      const lastOperand = this.getLastOperand();
      if (lastOperand.includes('.')) return;
    }

    // 2. Prevent leading zero
    if (value === '0') {
      if (exp === '') return; // cannot start with zero
      if (this.isOperator(last)) return; // cannot place zero directly after operator
    }

    // 3. Prevent double operators
    if (this.isOperator(value)) {
      if (exp === '' || this.isOperator(last)) return;
    }

    this.display.set(exp + value);
    this.liveCalc();
  }

  clear() {
    this.display.set('');
    this.result?.set?.('');
  }

  allClear() {
    this.display.set('');
    this.result.set('');
  }

  liveCalc() {
    let exp = this.display();

    if (!exp) {
      this.result.set('');
      return;
    }

    // remove invalid trailing characters
    const last = exp.slice(-1);
    if (this.isOperator(last) || last === '.') {
      exp = exp.slice(0, -1);
    }

    if (!exp) {
      this.result.set('');
      return;
    }

    try {
      const evaluated = Function(`"use strict"; return (${exp})`)();
      this.result.set(String(evaluated));
    } catch {
      // ignore errors during typing
    }
  }

  backspace() {
    this.display.update(v => v.slice(0, -1));
  }

  calculate() {
    this.liveCalc();
    if (this.result()) {
      this.display.set(this.result());
    }
  }
}
