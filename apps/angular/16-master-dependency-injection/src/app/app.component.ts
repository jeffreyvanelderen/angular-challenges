import { TableComponent } from '@angular-challenges/shared/ui';
import { NgFor } from '@angular/common';
import { Component, Directive } from '@angular/core';
import { ProductRowComponent } from './components/product-row.component';
import { CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  selector: 'ng-template[product]',
  standalone: true,
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Component({
  imports: [TableComponent, NgFor, ProductDirective, ProductRowComponent],
  providers: [CurrencyService],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          <th *ngFor="let col of displayedColumns">
            {{ col }}
          </th>
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr product-row [product]="product"></tr>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
