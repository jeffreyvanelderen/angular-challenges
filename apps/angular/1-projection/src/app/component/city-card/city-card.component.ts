import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      (onAddNewItem)="onAddNewItem()"
      (onDeleteItem)="onDeleteItem($event)"
      listItemTitle="name"
      customClass="bg-light-green">
      <img
        ngProjectAs="card-image"
        src="assets/img/city.png"
        width="200"
        height="200" />
    </app-card>
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((cities) => this.store.addAll(cities));
  }

  onAddNewItem() {
    this.store.addOne(randomCity());
  }

  onDeleteItem({ id }: City) {
    this.store.deleteOne(id);
  }
}
