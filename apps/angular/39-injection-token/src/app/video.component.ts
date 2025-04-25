import { Component } from '@angular/core';
import { provideTimer } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-video',
  imports: [TimerContainerComponent],
  providers: [provideTimer(1000)],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default 1000s)</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {}
