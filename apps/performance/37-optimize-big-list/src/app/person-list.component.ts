import { NgForTrackByModule } from '@angular-challenges/shared/directives';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person-list',
  imports: [NgForTrackByModule, ScrollingModule],
  template: `
    <div class="relative h-[500px] overflow-hidden">
      <div class="absolute inset-0 overflow-scroll">
        <!-- https://material.angular.io/cdk/scrolling/overview -->
        <cdk-virtual-scroll-viewport appendOnly itemSize class="h-full">
          <div
            class="z-50 flex h-9 items-center justify-between border-b"
            *cdkVirtualFor="let person of persons; trackBy: trackPerson">
            <h3>{{ person.name }}</h3>
            <p>{{ person.email }}</p>
          </div>
        </cdk-virtual-scroll-viewport>
      </div>
    </div>
  `,
  host: {
    class: 'w-full flex flex-col',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonListComponent {
  @Input() persons: Person[] = [];

  trackPerson(_: number, { email }: Person) {
    return email;
  }
}
