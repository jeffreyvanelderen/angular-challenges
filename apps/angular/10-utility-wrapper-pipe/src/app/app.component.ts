import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonUtils } from './person.utils';
import { PersonUtilPipe } from './pipes/person-util.pipe';

@Component({
  imports: [NgFor, PersonUtilPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let activity of activities">
      {{ activity.name }} :
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        <!-- {{ showName(person.name, index) }} -->
        <!-- {{ isAllowed(person.age, isFirst, activity.minimumAge) }} -->
        {{ 'showName' | personUtil: person.name : index }}
        {{
          'isAllowed' | personUtil: person.age : isFirst : activity.minimumAge
        }}
      </div>
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  activities = [
    { name: 'biking', minimumAge: 12 },
    { name: 'hiking', minimumAge: 25 },
    { name: 'dancing', minimumAge: 1 },
  ];

  showName = PersonUtils.showName;

  isAllowed = PersonUtils.isAllowed;
}
