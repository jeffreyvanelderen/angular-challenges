import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CardComponent,
  CardMessageDirective,
  CardTitleDirective,
} from './card.component';

@Component({
  //import helper directives
  imports: [CardComponent, CardTitleDirective, CardMessageDirective],
  selector: 'app-root',
  template: `
    <app-card [small]="false">
      <!-- Use ng-template with directive here instead of <div title></div> -->
      <ng-template appCardTitle>Card 1</ng-template>
      <ng-template appCardMessage>Message 1</ng-template>
    </app-card>
    <app-card [small]="true">
      <ng-template appCardTitle>Card 2</ng-template>
      <ng-template appCardMessage>Message 2</ng-template>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
