import { Component } from '@angular/core';
import { provideTimer } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  imports: [TimerContainerComponent],
  providers: [provideTimer(2000)],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {}
