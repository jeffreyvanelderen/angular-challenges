import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      (onAddNewItem)="onAddNewItem()"
      (onDeleteItem)="onDeleteItem($event)"
      listItemTitle="firstName"
      customClass="bg-light-green">
      <img
        ngProjectAs="card-image"
        src="assets/img/student.webp"
        width="200"
        height="200" />
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onAddNewItem() {
    this.store.addOne(randStudent());
  }

  onDeleteItem({ id }: Student) {
    this.store.deleteOne(id);
  }
}
