import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { injectTimerState } from './data';

@Component({
  selector: 'timer',
  standalone: true,
  template: `
    Timer running {{ timer() }}
  `,
})
export class TimerComponent {
  injectedState = injectTimerState({ optional: false }); // Inject duration, which is set via the parent components

  timer = toSignal(interval(this.injectedState?.timer));
}
