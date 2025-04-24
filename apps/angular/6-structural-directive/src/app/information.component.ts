import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HasRoleDirective } from './directives/has-role.directive';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'app-information',
  imports: [CommonModule, HasRoleDirective],
  template: `
    <h2 class="mt-10 text-xl">Information Panel</h2>
    <!-- admin can see everything -->
    <div *hasRole="[]">visible only for super admin</div>
    <div *hasRole="Role.MANAGER">visible if manager</div>
    <div *hasRole="[Role.MANAGER, Role.READER]">
      visible if manager and/or reader
    </div>
    <div *hasRole="[Role.MANAGER, Role.WRITER]">
      visible if manager and/or writer
    </div>
    <div *hasRole="Role.CLIENT">visible if client</div>
    <div *hasRole="[]">visible for everyone</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  user$ = this.userStore.user$;
  Role = Role;

  constructor(private userStore: UserStore) {}
}
