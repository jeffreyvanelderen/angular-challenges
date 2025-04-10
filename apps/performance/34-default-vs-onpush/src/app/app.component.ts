import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';

@Component({
  imports: [PersonListComponent, RandomComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-person-list [initialList]="girlList()" title="Female" />
      <app-person-list [initialList]="boyList()" title="Male" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  girlList = signal(randFirstName({ gender: 'female', length: 10 }));
  boyList = signal(randFirstName({ gender: 'male', length: 10 }));
}
