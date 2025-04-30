/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  host: {
    '(change)': '_onChange?.($event.target.value)',
    '(blur)': '_onTouched?.()',
  },
  providers: [
    // Register (provide) your custom input form field!
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  value: number | null = null;
  isDisabled = signal<boolean>(false);

  iterable = Array.from({ length: 5 }, (_, index) => index);

  _onChange: (_: any) => void = () => {};
  _onTouched: (_?: any) => void = () => {};

  setRating(index: number): void {
    if (this.isDisabled()) {
      return;
    }

    this.value = index + 1;
    this._onChange(`${this.value}`);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }

  /**
   * When implementing the registerOnChange method in your own value accessor, save the given function so your class calls it at the appropriate time.
   * When the value changes in the UI, call the registered function to allow the forms API to update itself:
   * host: {
   *    '(change)': '_onChange($event.target.value)'
   * }
   * @param fn
   */
  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  /**
   * When implementing registerOnTouched in your own value accessor, save the given function so your class calls it when the control should be considered blurred or "touched".
   * On blur (or equivalent), your class should call the registered function to allow the forms API to update itself:
   * host: {
   *    '(blur)': '_onTouched()'
   * }
   * @param fn
   */
  registerOnTouched(fn: (_: any) => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
}
