/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable @angular-eslint/no-host-metadata-property */
import {
  BUTTON_INJECTION_TOKEN,
  ButtonType,
} from '@angular-challenges/decoupling/core';
import { Directive, WritableSignal, forwardRef, signal } from '@angular/core';

@Directive({
  selector: 'button[btnDisabled]',
  standalone: true,
  host: {
    '(click)': 'toggleState()',
  },
  // !!!!! Created injection token in the core library to decouple components: libs/decoupling/core/src/button.state.ts
  providers: [
    {
      provide: BUTTON_INJECTION_TOKEN,
      useExisting: forwardRef(() => BtnDisabledDirective),
      /*
        ForwardRef: Allows to refer to references which are not yet defined.
        For instance, forwardRef is used when the token which we need to refer to for the purposes of DI is declared, but not yet defined. It is also used when the token which we use when creating a query is not yet defined.
        forwardRef is also used to break circularities in standalone components imports.
      */
    },
  ],
})
export class BtnDisabledDirective {
  state: WritableSignal<ButtonType> = signal(ButtonType.ENABLED);

  toggleState() {
    this.state.set(
      this.state() === ButtonType.ENABLED
        ? ButtonType.DISABLED
        : ButtonType.ENABLED,
    );
  }
}
