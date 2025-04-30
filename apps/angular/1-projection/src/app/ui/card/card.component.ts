import { Component, EventEmitter, input, Output } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="card-image" />
      <section>
        @for (item of list(); track item) {
          <app-list-item
            [name]="getTitleForItem(item)"
            [id]="item.id"
            (onDelete)="onDelete(item)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent],
})
export class CardComponent<T extends { id: number }> {
  readonly list = input<T[]>([]);
  readonly customClass = input('');

  readonly listItemTitle = input<keyof T>();

  @Output() onAddNewItem: EventEmitter<null> = new EventEmitter<null>();
  @Output() onDeleteItem: EventEmitter<T> = new EventEmitter<T>();

  addNewItem() {
    this.onAddNewItem.emit();
  }

  onDelete(item: T) {
    this.onDeleteItem.emit(item);
  }

  getTitleForItem(item: T): string {
    if (this.listItemTitle() && this.listItemTitle()! in item) {
      return (item as any)[this.listItemTitle()];
    }
    return '';
  }
}
