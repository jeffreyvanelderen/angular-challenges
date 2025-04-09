import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <p>Option 1 using static snapshot via ActivatedRoute</p>
    <label for="user">User</label>
    <input id="user" type="text" [formControl]="userControl" />

    <label for="testId">TestId</label>
    <input id="testId" type="number" [formControl]="testIdControl" />

    <label for="permission">Permission</label>
    <input id="permission" type="text" [formControl]="permissionControl" />

    <button
      [routerLink]="'subscription/' + testIdControl.value"
      [queryParams]="{ user: userControl.value }"
      [state]="{ permission: permissionControl.value }">
      Test
    </button>

    <button routerLink="/">HOME</button>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  userControl = new FormControl();
  testIdControl = new FormControl();
  permissionControl = new FormControl();
}
