import { Component, signal } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  imports: [PlaceholderComponent, TopComponent],
  template: `
    <div class="h-screen bg-gray-500">
      <!-- Trigger on condition using 'when', when the variable is set to true-->
      @defer (when topLoaded()) {
        <app-top />
      } @placeholder (minimum 1000ms) {
        <app-placeholder />
      } @loading (minimum 1000ms) {
        <p>Loading...</p>
      }
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="topLoaded.set(true)">
        Load Top
      </button>
    </div>
  `,
})
export class AppComponent {
  topLoaded = signal(false);
}
