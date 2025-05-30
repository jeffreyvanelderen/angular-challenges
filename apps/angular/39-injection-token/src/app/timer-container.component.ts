import { Component } from '@angular/core';
import { injectTimerState } from './data';
import { TimerComponent } from './timer.component';
@Component({
  selector: 'timer-container',
  imports: [TimerComponent],
  template: `
    <div class="flex gap-2">
      Timer container:
      <p class="italic">(timer is {{ timer }}s)</p>
    </div>
    <timer />
  `,
  host: {
    class: 'border rounded-md flex p-4 gap-10',
  },
})
export class TimerContainerComponent {
  timer = injectTimerState({ optional: false })?.timer; // also inject timer state here to be able to show it in this component
}
