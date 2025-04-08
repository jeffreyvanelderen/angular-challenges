import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url);
  }

  update(todo: Todo) {
    return this.http.put<Todo>(`${this.url}/${todo.id}`, JSON.stringify(todo), {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}
