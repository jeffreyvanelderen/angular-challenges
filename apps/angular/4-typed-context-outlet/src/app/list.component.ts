import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  input,
  Input,
  TemplateRef,
} from '@angular/core';

interface Context<T> {
  $implicit: T;
  appList: T;
  index: number;
}

@Directive({
  standalone: true,
  selector: 'ng-template[appList]]',
})
export class ListDirective<T> {
  appList = input.required<T[]>();

  static ngTemplateContextGuard<TC>(
    dir: ListDirective<TC>,
    ctx: unknown,
  ): ctx is Context<TC> {
    return true;
  }
}

@Component({
  selector: 'list',
  imports: [CommonModule, NgTemplateOutlet],
  template: `
    <div *ngFor="let item of list; index as i">
      <ng-container
        *ngTemplateOutlet="
          listTemplateRef() || emptyRef;
          context: { $implicit: item, appList: item, index: i }
        "></ng-container>
    </div>

    <ng-template #emptyRef>No Template</ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  // Pass type here using ListDirective with generic type
  readonly listTemplateRef = contentChild.required(ListDirective<TItem>, {
    read: TemplateRef,
  });
}
