import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyComputationPipe } from '../pipes/heavy-calculation.pipe';

@Component({
  imports: [NgFor, HeavyComputationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | heavyComputation: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  /**
   * Pipes are a very powerful way to transform data in your template.
   * The difference between calling a function and a pipe is that PURE PIPES ARE MEMOIZED.
   * So, they won’t be recalculated every change detection cycle if their inputs haven’t changed.
   */

  heavyComputation(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
