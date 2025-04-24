import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomNgForDirective } from './directive/custom-ng-for.directive';

interface Person {
  name: string;
}

@Component({
  imports: [CustomNgForDirective],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>
    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
