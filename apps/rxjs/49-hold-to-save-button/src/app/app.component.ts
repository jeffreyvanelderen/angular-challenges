import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Subject, Subscription } from 'rxjs';

const START = 0;

// Milliseconds
const DELAY = 25;

@Component({
  imports: [AsyncPipe],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700"
          (mousedown)="onMouseDown()"
          (mouseleave)="onMouseLeave()"
          (mouseup)="onMouseUp()">
          Hold me
        </button>

        <progress [value]="subject$ | async" [max]="100"></progress>
        <p>{{ subject$ | async }}</p>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  subject$ = new Subject<number>();
  subscription: Subscription | undefined;

  onSend() {
    alert(`Done, saved.`);
  }

  cancelCounter() {
    this.subscription?.unsubscribe();
  }

  onMouseUp() {
    console.log(`onMouseUp`);
    this.cancelCounter();
  }

  onMouseLeave() {
    console.log(`onMouseLeave`);
    this.cancelCounter();
  }

  onMouseDown() {
    console.log(`onMouseDown`);

    // Subscribe to future values
    this.subscription = this.subject$.pipe(delay(DELAY)).subscribe((value) => {
      console.log(`value`, value);

      const nextValue = value + 1;
      if (nextValue < 100) {
        this.subject$.next(nextValue);
        return;
      }
      // TODO Done!
      this.onSend();
    });

    // Get the ball rolling, starting with 0
    this.subject$.next(START);
  }
}
