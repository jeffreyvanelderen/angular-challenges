import { NgFor } from '@angular/common';
import {
  Directive,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[ngFor][ngForOf]',
  standalone: true,
  /*
    Met hostDirectives (een Angular 16+ feature) kan deze  directive andere directives "hosten" of "doorverwijzen" naar bestaande directives — in dit geval de standaard NgFor.
    = hergebruik van de standaard NgFor directive binnen de eigen custom directive, zonder interne werking ervan te kopiëren;
      Je directive gedraagt zich als een NgFor
      Je kunt dezelfde inputs (ngForOf, ngForTrackBy, etc.) gebruiken
      Je kunt de functionaliteit uitbreiden met extra logica, zoals jij doet met ngForEmpty
  */
  hostDirectives: [
    {
      directive: NgFor,
      // deze 'functionaliteiten' van ngFor, ngForTrackBy en ngForTemplate beschikbaar maken op deze custom directive
      inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
    },
  ],
})
export class CustomNgForDirective<T, U> implements OnChanges {
  private viewContainer = inject(ViewContainerRef);

  // Deze input komt van de originele ngFor en bepaalt de lijst waarover gelopen wordt.
  // ngForOf = let item OF items
  @Input() ngForOf!: T[];
  // Een nieuwe input die je toevoegt: dit is een template die getoond wordt als de lijst leeg is.
  @Input() ngForEmpty: TemplateRef<U> | undefined;

  ngOnChanges(_: SimpleChanges): void {
    if (this.ngForOf.length === 0 && this.ngForEmpty) {
      this.viewContainer.createEmbeddedView(this.ngForEmpty);
    }
  }
}
