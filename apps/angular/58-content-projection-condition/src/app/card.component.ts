import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  input,
  TemplateRef,
} from '@angular/core';

// Create directive to avoid magic string directive
@Directive({
  selector: '[appCardTitle]',
})
export class CardTitleDirective {}

// Create directive to avoid magic string directive
@Directive({
  selector: '[appCardMessage]',
})
export class CardMessageDirective {}

@Component({
  selector: 'app-card',
  template: `
    <!-- Use ng-container with template since 2 ng-content tags with the same selector can't co-exist. This is an Angular by design constraint. -->
    @if (small()) {
      <ng-container [ngTemplateOutlet]="cardTitle()" />
      <ng-container [ngTemplateOutlet]="cardMessage()" />
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container [ngTemplateOutlet]="cardTitle()" />
        </div>
        <ng-container [ngTemplateOutlet]="cardMessage()" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);

  cardTitle = contentChild.required(CardTitleDirective, {
    read: TemplateRef,
  });
  cardMessage = contentChild.required(CardMessageDirective, {
    read: TemplateRef,
  });
}
