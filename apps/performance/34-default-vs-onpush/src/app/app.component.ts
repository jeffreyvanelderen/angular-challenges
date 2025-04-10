import {
  ChangeDetectionStrategy,
  Component,
  signal,
  type WritableSignal,
} from '@angular/core';
import { randFirstName } from '@ngneat/falso';
import { InputComponent } from './input.component';
import { PersonListComponent } from './person-list.component';
import { RandomComponent } from './random.component';

@Component({
  imports: [PersonListComponent, RandomComponent, InputComponent],
  selector: 'app-root',
  template: `
    <app-random />

    <div class="flex">
      <app-input (enterName)="onEnteredName(this.girlList, $event)" />
      <app-input (enterName)="onEnteredName(this.boyList, $event)" />
    </div>

    <div class="flex">
      <app-person-list [names]="girlList()" title="Female" />
      <app-person-list [names]="boyList()" title="Male" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  girlList = signal(randFirstName({ gender: 'female', length: 10 }));
  boyList = signal(randFirstName({ gender: 'male', length: 10 }));

  onEnteredName(list: WritableSignal<string[]>, $event: string) {
    console.log(`Updating ${list()} with ${$event}`);
    list.update((previous) => [$event, ...previous]);
  }
}
