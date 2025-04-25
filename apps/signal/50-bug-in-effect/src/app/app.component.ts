import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  constructor() {
    // Effect does not work as you'd expect! Not the same as in React!

    effect(() => {
      // This console logs also fixed the bug...
      // console.log(`EFFECT!`, this.drive(), this.ram(), this.gpu());

      // Effects keep track of their dependencies dynamically, and only track signals that were read in the most recent execution.
      // if you'd do this the short way: if (this.drive() || this.ram() || this.gpu()) {
      // The effect does not trigger when the second of third signal changes, since they were not read in that execution when first variable was already true!

      // If needed in production, it is best to create 1 effect per signal (so here you'd have 3 effects)

      const hasDrive = this.drive(); // Forces effect to read the value
      const hasRam = this.ram(); // Forces effect to read the value
      const hasGpu = this.gpu(); //Forces effect to read the value

      if (hasDrive || hasRam || hasGpu) {
        alert('Price increased!');
      }
    });
  }
}
