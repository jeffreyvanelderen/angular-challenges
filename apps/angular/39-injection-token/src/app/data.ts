import {
  InjectOptions,
  InjectionToken,
  ValueProvider,
  inject,
} from '@angular/core';

export const DEFAULT_TIMER = 1000;

export interface TimerState {
  timer: number;
}

export const TIMER_INJECTION_TOKEN: InjectionToken<TimerState> =
  new InjectionToken<TimerState>('TIMER_INJECTION_TOKEN');

export const injectTimerState = (options: InjectOptions) =>
  inject(TIMER_INJECTION_TOKEN, options);

// Helper method for type safety
export const provideTimer = (value: number): ValueProvider => ({
  provide: TIMER_INJECTION_TOKEN,
  useValue: { timer: value } satisfies TimerState,
});
