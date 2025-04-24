/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { TextStaticComponent } from './static-text.component';
import { TextComponent } from './text.component';

@Component({
  selector: 'page',
  imports: [TextStaticComponent, TextComponent],
  template: `
    <static-text></static-text>
    <!-- CLASS !!!!!!!!!!!! -> check je op via :host-context  -->
    <static-text class="error"></static-text>
    <static-text class="warning"></static-text>
    <text>This is a blue text</text>
  `,
  styles: [
    `
      text {
        --text-font-size: 15px;
        --text-color: blue;
      }
    `,
  ],
})
export class PageComponent {}
