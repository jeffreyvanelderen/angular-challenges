import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

// NOTE : this is just the dialog content, you need to implement dialog logic

@Component({
  standalone: true,
  template: `
    <div role="alert" class="rounded-xl border border-gray-100 bg-white p-5">
      <h3 class="block text-xl font-medium text-red-600">
        You have unsaved information!
      </h3>

      <p class="mt-1 text-gray-700">Do you want to continue and lose them?</p>

      <div class="mt-4 flex gap-2">
        <!-- The boolean passed here is the value that is also returned in the FormDeactivateGuard function to decide wether to allow deactivation!  -->
        <button
          (click)="dialogRef.close(true)"
          class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          Yes continue
        </button>

        <!-- The boolean passed here is the value that is also returned in the FormDeactivateGuard function to decide wether to allow deactivation!  -->
        <button
          (click)="dialogRef.close(false)"
          class="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50">
          Stay on page
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent {
  dialogRef = inject(DialogRef<boolean>);
}
