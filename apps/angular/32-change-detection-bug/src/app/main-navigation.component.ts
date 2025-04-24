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
    <ng-container *ngFor="let menu of menus">
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
}

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
