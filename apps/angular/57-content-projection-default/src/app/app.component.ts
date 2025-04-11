import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-root',
  template: `
    <app-card>
      <!-- De selector moet je zetten op specifieke HTML tags zoals bv div, niet random '<card-title></card-title>' want is unknown component -->
      <div card-title>Title 1</div>
      <div card-message>Messag 1</div>
    </app-card>

    <app-card>
      <div card-title>Title 2</div>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
