import {
  Directive,
  inject,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnDestroy {
  private viewContainer = inject(ViewContainerRef);
  // We MOETEN templateRef injecteren zodat Angular een ng-template rond onze div gaat zetten om content te kunnen renderen!
  private templateRef = inject(TemplateRef<any>);

  private store = inject(UserStore);

  private subscription: Subscription | undefined;

  private hasAccess = false;
  private hasView = false;

  // Property setter (shortcut voor ngOnChanges, maar specifiek voor 1 input)
  // Deze naam moet ook exact overeenkomen met de directive selector
  @Input() set hasRole(roles: Role | Role[]) {
    const rolesList = Array.isArray(roles) ? roles : [roles];

    this.subscription?.unsubscribe();
    this.subscription = this.store.user$.subscribe((user) => {
      this.hasAccess = !!(
        rolesList.length === 0 ||
        user?.roles.some((userRole) => rolesList.includes(userRole))
      );

      if (this.hasAccess && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!this.hasAccess && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
