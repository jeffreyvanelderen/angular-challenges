import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListComponent, ListDirective } from './list.component';
import { PersonComponent, PersonDirective } from './person.component';

@Component({
  imports: [
    NgTemplateOutlet,
    PersonComponent,
    PersonDirective,
    ListComponent,
    ListDirective,
  ],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <!-- Adding person (Directive) here to add explicit types -->
      <ng-template #personRef person let-name let-age="age">
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <!-- Adding [appList] directive to add explicit types -->
      <ng-template #listRef let-student [appList]="students" let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template #listRef let-city [appList]="cities" let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
