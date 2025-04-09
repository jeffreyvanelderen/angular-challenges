import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-subscription',
  imports: [AsyncPipe],
  template: `
    <section>
      <p>
        Option 1 using a static snapshot taken from ctor or onInit() which will
        not update when the values change
      </p>
      <p>user: {{ snapshotUser }}</p>
      <p>testId: {{ snapshotTestId }}</p>
      <p>permission: {{ snapshotPermission }}</p>
    </section>
    <section>
      <p>
        Option 2 using observables via activatedRoute, which are updated
        automatically when the values change
      </p>
      <p>user: {{ user$ | async }}</p>
      <p>testId: {{ testId$ | async }}</p>
      <p>permission: {{ permission$ | async }}</p>
    </section>
    <section>
      <p>
        Option 3 using withComponentInputBinding() on router since Angular v16
        to bind parameters directly via Input() to variables on the component
      </p>
      <p>user: {{ user }}</p>
      <p>testId: {{ testId }}</p>
      <p>permission: {{ permission }}</p>
    </section>
  `,
  styles: `
    section {
      padding: 12px;
      border: 1px solid black;
      margin: 6px;
      border-radius: 12px;
    }
  `,
})
export default class TestComponent {
  // Option 1
  snapshotUser: string | undefined;
  snapshotPermission: string | undefined;
  snapshotTestId: number | undefined;

  // Option 2
  testId$: Observable<string> | undefined;
  permission$: Observable<string> | undefined;
  user$: Observable<string> | undefined;

  // Option 3. Add withComponentInputBinding() in app.config.ts to allow using @Input() to bind
  // query params, route params and data objects directly to the variables declared here!
  // When the parameters change, these will also be updated!
  @Input({ transform: (value: string) => +value }) testId!: number; // The name needs to be the same as the one you put in the path in app.routes.ts! -> 'subscription/:testId'
  @Input() permission!: string;
  @Input() user!: string;

  // If you don’t need to perform any operation on the input (such as converting its type for example), prefer the more modern signal input() instead of the classic @Input()
  // productId = input<string>();

  constructor(private activatedRoute: ActivatedRoute) {
    // Option 1. You can take a snapshot, which is a static 'screenshot' of the paramaters at a certain point in time. You will not be notified if the parameters change.
    this.snapshotTestId = +this.activatedRoute.snapshot.params['testId'];
    this.snapshotPermission = this.activatedRoute.snapshot.data['permission'];
    this.snapshotUser = this.activatedRoute.snapshot.queryParams['user'];

    // Option 2. Alternatively, each parameter can be listened to as an observable.
    // Although this may feel more complex, it provides the advantage of being notified when the value changes.
    // (using asyncPipe in template or subscribe you can subscribe for updates)
    this.testId$ = this.activatedRoute.params.pipe<string>(
      map((p) => p['testId']),
    );
    this.permission$ = this.activatedRoute.data.pipe<string>(
      map((d) => d['permission']),
    );
    this.user$ = this.activatedRoute.queryParams.pipe<string>(
      map((q) => q['user']),
    );
  }
}
