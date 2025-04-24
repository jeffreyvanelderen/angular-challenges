/* eslint-disable @angular-eslint/directive-selector */
import {
  ButtonType,
  injectButtonState,
} from '@angular-challenges/decoupling/core';
import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  signal,
} from '@angular/core';

@Directive({
  selector: 'button[hlm]',
  standalone: true,
  host: {
    class:
      'border border-black p-4 rounded-md bg-white data-[state=disabled]:bg-gray-400 data-[state=disabled]:text-white',
  },
})
export class BtnHelmetDirective {
  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  // !!! New
  private buttonState = injectButtonState({ self: true }); // instead of hard 'link' like: btnState = inject(BtnDisabledDirective, { self: true });

  public state =
    this.buttonState?.state ?? signal(ButtonType.DISABLED).asReadonly();

  private rendererEffect = effect(() => {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-state',
      this.state(),
    );
  });
}
