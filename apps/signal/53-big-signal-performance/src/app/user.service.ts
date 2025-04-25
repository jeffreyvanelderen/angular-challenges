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

  // Another (arguably better) solution would be to make readable computed fields which the other components can read from, and don't cause them to re-render:
  // This would then still contain the big user signal
  /*
  readonly name = computed(() => this.user().name);
  readonly note = computed(() => this.user().note);
  readonly title = computed(() => this.user().title);
  readonly salary = computed(() => this.user().salary);
  readonly street = computed(() => this.user().address.street);
  readonly zipCode = computed(() => this.user().address.zipCode);
  readonly city = computed(() => this.user().address.city);
  */
}
