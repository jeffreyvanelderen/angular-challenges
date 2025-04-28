import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  imports: [CommonModule, UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />
    <button
      class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
      (click)="discover()">
      Discover
    </button>
    <div class="p-1 text-white">
      Progress:
      {{ workerLoadingPercentage() || loadingPercentage() }}%
    </div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  private heavyCalculationService = inject(HeavyCalculationService);

  workerLoadingPercentage = signal(0);
  loadingPercentage = signal(0);

  discover() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(
        new URL('./heavy-calculation.worker', import.meta.url), // trigger heavy calculation worker
      );
      worker.onmessage = ({ data }) => {
        this.workerLoadingPercentage.set(Math.round(data));
        this.loadingPercentage.set(Math.round(data));
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      this.heavyCalculationService.startLoading();
    }
  }
}
