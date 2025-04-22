import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delay, Subject } from 'rxjs';

const STAND_BY = -1;
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
export class AppComponent implements OnInit {
  subject$ = new Subject<number>();

  ngOnInit(): void {
    this.subject$.pipe(delay(DELAY)).subscribe((value) => {
      console.log(`value`, value);
      if (value === STAND_BY) {
        // Do nothing
        this.subject$.complete();
        return;
      }

      const nextValue = value + 1;
      if (nextValue < 100) {
        this.subject$.next(nextValue);
        return;
      }
      // TODO Done!
      this.onSend();
    });
  }

  onSend() {
    alert(`Done, saved.`);
  }

  cancelCounter() {
    this.subject$.next(STAND_BY);
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
    this.subject$.next(START);
  }
}
