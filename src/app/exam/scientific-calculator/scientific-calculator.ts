import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-scientific-calculator',
  imports: [NgClass],
  templateUrl: './scientific-calculator.html',
  styleUrl: './scientific-calculator.css',
})
export class ScientificCalculator {
  display = signal('');
  history = signal<{ expression: string; result: string }[]>([]);


  buttons = [
    { label: '(', value: '(', class: 'bg-gray-700' },
    { label: ')', value: ')', class: 'bg-gray-700' },
    { label: 'AC', value: 'AC', class: 'bg-orange-500' },
    { label: 'DEL', value: 'DEL', class: 'bg-orange-500' },
    { label: '/', value: '/', class: 'bg-orange-500' },
    { label: '*', value: '*', class: 'bg-orange-500' },


    { label: '^2', value: '^2', class: 'bg-gray-700' },
    { label: '^3', value: '^3', class: 'bg-gray-700' },
    ...['7', '8', '9'].map(n => ({ label: n, value: n, class: 'bg-gray-500' })),
    { label: '-', value: '-', class: 'bg-orange-500' },


    { label: '√', value: '√(', class: 'bg-gray-700' },
    { label: '∛', value: '∛(', class: 'bg-gray-700' },
    ...['6', '5', '4'].map(n => ({ label: n, value: n, class: 'bg-gray-500' })),
    { label: '+', value: '+', class: 'bg-orange-500' },


    { label: '!', value: '!', class: 'bg-gray-700' },
    { label: 'sin', value: 'sin(', class: 'bg-gray-700' },
    ...['1', '2', '3'].map(n => ({ label: n, value: n, class: 'bg-gray-500' })),
    { label: '=', value: '=', class: 'bg-red-500 row-span-2' },


    { label: 'cos', value: 'cos(', class: 'bg-gray-700' },
    { label: 'tan', value: 'tan(', class: 'bg-gray-700' },
    { label: '0', value: '0', class: 'bg-gray-500 col-span-2' },
    { label: '.', value: '.', class: 'bg-gray-500' }
  ];


  onButton(btn: any) {
    const value = btn.value;


    if (value === 'AC') {
      this.display.set('');
      return;
    }


    if (value === 'DEL') {
      this.display.set(this.display().slice(0, -1));
      return;
    }


    if (value === '=') {
      this.calculate();
      return;
    }


    this.display.update(v => v + value);
  }


  calculate() {
    try {
      const expr = this.display()
        .replaceAll('sin', 'Math.sin')
        .replaceAll('cos', 'Math.cos')
        .replaceAll('tan', 'Math.tan')
        .replaceAll('^2', '**2')
        .replaceAll('^3', '**3')
        .replaceAll('√', 'Math.sqrt')
        .replaceAll('∛', 'Math.cbrt')
        .replace(/(\d+)!/g, (_, n) => this.factorial(+n).toString());


      const result = eval(expr);
      if (!Number.isFinite(result)) throw new Error();


      const formatted = Number.isInteger(result) ? result.toString() : result.toFixed(2);
      this.history.update(h => [...h, { expression: this.display(), result: formatted }]);
      this.display.set(formatted);
    } catch {
      this.display.set('Invalid Expression');
    }
  }


  factorial(n: number): number {
    return n <= 1 ? 1 : n * this.factorial(n - 1);
  }


  removeHistory(item: any) {
    this.history.update(h => h.filter(i => i !== item));
  }
}
