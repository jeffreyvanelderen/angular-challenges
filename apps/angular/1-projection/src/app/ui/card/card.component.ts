import { NgOptimizedImage } from '@angular/common';
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
            [name]="item[listItemTitle()]"
            [id]="item.id"
            (onDelete)="onDelete($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [ListItemComponent, NgOptimizedImage],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  readonly listItemTitle = input('');

  @Output() onAddNewItem: EventEmitter<null> = new EventEmitter<null>();
  @Output() onDeleteItem: EventEmitter<number> = new EventEmitter<number>();

  addNewItem() {
    this.onAddNewItem.emit();
  }

  onDelete(id: number) {
    this.onDeleteItem.emit(id);
  }
}
