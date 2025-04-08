import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Todo } from '../models';
import { TodoService } from '../services/todo.service';

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAll().subscribe((data) => this.todos.set(data));
  }

  update(todo: Todo) {
    this.todoService
      .update({ ...todo, title: todo.title.split('').reverse().join('') })
      .subscribe((updatedTodo) => {
        const copy: Todo[] = [...this.todos()];
        copy[updatedTodo.id - 1] = updatedTodo;

        this.todos.set(copy);
      });
  }
}
