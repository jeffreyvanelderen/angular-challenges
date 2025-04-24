import { InjectOptions, InjectionToken, Signal, inject } from '@angular/core';

export const BUTTON_INJECTION_TOKEN_KEY = 'BUTTON_INJECTION_TOKEN';

export enum ButtonType {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

interface ButtonState {
  state: Signal<ButtonType>;
}

export const BUTTON_INJECTION_TOKEN: InjectionToken<ButtonState> =
  new InjectionToken<ButtonState>(BUTTON_INJECTION_TOKEN_KEY);

export const injectButtonState = (options: InjectOptions) =>
  inject(BUTTON_INJECTION_TOKEN, options);
