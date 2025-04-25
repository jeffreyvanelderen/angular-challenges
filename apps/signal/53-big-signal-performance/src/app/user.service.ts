import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserStore {
  name = signal('Bob');
  note = signal('');
  title = signal('');
  salary = signal(0);
  address = signal({
    street: '',
    zipCode: '',
    city: '',
  });
}
