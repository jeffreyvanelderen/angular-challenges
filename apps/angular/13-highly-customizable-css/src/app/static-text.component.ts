/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextComponent } from './text.component';

export type StaticTextType = 'normal' | 'warning' | 'error';

@Component({
  selector: 'static-text',
  imports: [TextComponent],
  template: `
    <text>This is a static text</text>
  `,
  styles: [
    `
      // Als deze component via parent de .error class krijgt, dan herdefinieren we deze 2 variabelen
      :host-context(.error) {
        --text-font-size: 30px;
        --text-color: red;
      }

      :host-context(.warning) {
        --text-font-size: 25px;
        --text-color: orange;
      }
    `,
  ],
})
export class TextStaticComponent {}
