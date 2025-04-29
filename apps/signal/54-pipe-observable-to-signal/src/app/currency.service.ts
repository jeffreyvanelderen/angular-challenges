import { computed, Injectable, signal } from '@angular/core';

export enum Code {
  EUR = 'EUR',
  USD = 'USD',
  AUD = 'AUD',
  GBP = 'GBP',
  CAD = 'CAD',
}

export interface Currency {
  name: string;
  code: Code;
  symbol: string;
}

export const currency: Currency[] = [
  { name: 'Euro', code: Code.EUR, symbol: '€' },
  { name: 'Dollar US', code: Code.USD, symbol: 'US$' },
  { name: 'Dollar Australian', code: Code.AUD, symbol: 'AU$' },
  { name: 'Pound Sterling', code: Code.GBP, symbol: '£' },
  { name: 'Dollar Canadian', code: Code.CAD, symbol: 'CAD' },
];

@Injectable()
export class CurrencyService {
  private code = signal<Code>(Code.EUR);
  readonly symbol = computed<Currency>(
    () => currency.find((c) => c.code === this.code()) || currency[0],
  );

  public setCode(code: Code) {
    this.code.set(code);
  }
}
