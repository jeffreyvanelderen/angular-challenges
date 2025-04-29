import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { CurrencyPipe } from '../currency.pipe';
import { CurrencyService } from '../currency.service';
import { Product } from '../product.model';

@Component({
  standalone: true,
  // !!!!!!!!!! selector can be an 'attribute' on a regular html element as well as indicated here!
  selector: 'tr[product-row]',
  template: `
    <td>{{ product().name }}</td>
    <td>{{ product().priceA | currency | async }}</td>
    <td>{{ product().priceB | currency | async }}</td>
    <td>{{ product().priceC | currency | async }}</td>
  `,
  imports: [AsyncPipe, CurrencyPipe],
  providers: [CurrencyService],
})
export class ProductRowComponent {
  product = input.required<Product>();
  currencyService = inject(CurrencyService);

  constructor() {
    effect(() => {
      const code = this.product().currencyCode;
      this.currencyService.setCode(code);
    });
  }
}
