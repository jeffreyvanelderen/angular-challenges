import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WrapFnPipe } from './pipes/wrap-fn.pipe';

@Component({
  imports: [NgFor, WrapFnPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      <!-- The pipe takes a function as first argument and then receives the function params as the remaining arguments -->
      {{ showName | wrapFn: person.name : index }}
      {{ isAllowed | wrapFn: person.age : isFirst }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
