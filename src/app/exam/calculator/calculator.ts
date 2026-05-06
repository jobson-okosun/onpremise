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
    let exp = this.display();
    const last = exp.slice(-1);
    const lastOperand = this.getLastOperand();

    // 1. Prevent multiple decimals in a single operand
    if (value === '.') {
      if (lastOperand.includes('.')) return;
    }

    // 2. Handle leading zero cases
    if (lastOperand === '0') {
      if (value === '0') return;
      if (value !== '.' && !this.isOperator(value)) {
        exp = exp.slice(0, -1);
      }
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
