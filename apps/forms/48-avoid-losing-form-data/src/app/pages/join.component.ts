import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { FormDeactivateCheck } from '../guards/form-deactivate.guard';
import { FormComponent } from '../ui/form.component';

@Component({
  imports: [FormComponent],
  template: `
    <section class="mx-auto	max-w-screen-sm">
      <div class="rounded-lg bg-white p-8 shadow-lg lg:p-12">
        <app-form />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinComponent implements FormDeactivateCheck {
  // Get a reference of the child form component
  formComponent = viewChild(FormComponent);

  // Implemented via our own interface!
  hasUnsavedChanges() {
    // we expose isDirty in our form component
    return !!this.formComponent()?.isDirty();
  }
}
