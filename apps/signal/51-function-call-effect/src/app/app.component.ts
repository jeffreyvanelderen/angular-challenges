import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionsComponent } from './action.component';
import { UserComponent } from './user.component';

@Component({
  imports: [FormsModule, ActionsComponent, UserComponent],
  selector: 'app-root',
  template: `
    <app-user />
    <app-actions />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
