import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  contentChild,
  Directive,
  Input,
  TemplateRef,
} from '@angular/core';

interface Person {
  name: string;
  age: number;
}

interface Context {
  $implicit: string;
  age: number;
}

@Directive({
  standalone: true,
  selector: 'ng-template[person]',
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is Context {
    return true;
  }
}

@Component({
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef() || emptyRef;
        context: { $implicit: person.name, age: person.age }
      "></ng-container>

    <ng-template #emptyRef>No Template</ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  personTemplateRef = contentChild.required(PersonDirective, {
    read: TemplateRef,
  });
}
