import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { randNumber } from '@ngneat/falso';
import { generateList } from './generateList';
import { PersonListComponent } from './person-list.component';

@Component({
  imports: [PersonListComponent, NgIf],
  selector: 'app-root',
  template: `
    <p>Performance is key!!</p>
    <button
      (click)="loadList = true"
      class="rounded-md border border-black p-2">
      Load List
    </button>

    <app-person-list
      *ngIf="loadList"
      class="max-w-2xl"
      [persons]="persons"
      title="Persons"
      (onAddPerson)="onAddPerson($event)" />
  `,
})
export class AppComponent {
  persons = generateList();
  loadList = false;

  onAddPerson(name: string) {
    this.persons = [
      {
        name,
        fib: randNumber({ min: 25, max: 30, precision: 1 }),
      },
      ...this.persons,
    ];
  }
}
