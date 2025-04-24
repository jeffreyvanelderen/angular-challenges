import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { FakeServiceService } from './fake.service';

interface MenuItem {
  path: string;
  name: string;
}

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgFor],
  template: `
    <!-- ALWAYS use trackBy - which also fixes the change detection cycle -->
    <ng-container *ngFor="let menu of menus; trackBy: getMenuTrackBy">
      <a
        class="rounded-md border px-4 py-2"
        [routerLink]="menu.path"
        routerLinkActive="isSelected">
        {{ menu.name }}
      </a>
    </ng-container>
  `,
  styles: [
    `
      a.isSelected {
        @apply bg-gray-600 text-white;
      }
    `,
  ],
  host: {
    class: 'flex flex-col p-2 gap-2',
  },
})
export class NavigationComponent {
  @Input() menus!: MenuItem[];

  getMenuTrackBy(_: number, value: MenuItem) {
    return value.path;
  }
}

// The root bug was the use of a method call in the template. The code was
// re-generating the menu items on every change detection cycle, which was
// causing the change detection cycle to re-run each time. Each change
// detection cycle would re-run the method, which would re-generate the menu,
// which would cause the change detection cycle to re-run again. This would
// continue indefinitely.
// The solution was to build the array once in the TypeScript code and then
// use that array in the template. This way, the array would not be
// re-generated on each change detection cycle, and the change detection cycle
// would not re-run indefinitely.
// Note that changing to use signals instead of the AsyncPipe and removing the
// extraneous ngIf layer had no effect on the behavior.
//
// Overall, this app is the best example I've seen of why trackBy and not
// using method calls in the template are important.
// https://github.com/tomalaforge/angular-challenges/pull/870/files

@Component({
  imports: [NavigationComponent, NgIf],
  template: `
    <ng-container *ngIf="info">
      <ng-container *ngIf="info !== null; else noInfo">
        <app-nav [menus]="menu()" />
      </ng-container>
    </ng-container>

    <ng-template #noInfo>
      <app-nav [menus]="menu()" />
    </ng-template>
  `,
  host: {},
})
export class MainNavigationComponent implements OnDestroy {
  private fakeBackend = inject(FakeServiceService);

  info = signal('');
  readonly info$ = this.fakeBackend.getInfoFromBackend();

  subscriptions: Subscription[] = [];

  menu = computed(() => [
    { path: '/foo', name: `Foo ${this.info()}` },
    { path: '/bar', name: `Bar` },
  ]);

  constructor() {
    this.subscriptions.push(
      this.info$.subscribe((newInfo) => {
        this.info.set(newInfo);
        console.log(`New info was set: ${newInfo}`);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
