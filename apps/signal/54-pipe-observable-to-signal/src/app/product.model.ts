import { Code } from './currency.service';

export interface Product {
  name: string;
  priceA: number;
  priceB: number;
  priceC: number;
  currencyCode: Code;
}

export const products: Product[] = [
  {
    name: 'bike',
    priceA: 1000,
    priceB: 2000,
    priceC: 2200,
    currencyCode: Code.USD,
  },
  {
    name: 'tent',
    priceA: 112,
    priceB: 120,
    priceC: 41,
    currencyCode: Code.EUR,
  },
  {
    name: 'sofa',
    priceA: 500,
    priceB: 422,
    priceC: 5000,
    currencyCode: Code.EUR,
  },
  {
    name: 'watch',
    priceA: 50,
    priceB: 130,
    priceC: 150,
    currencyCode: Code.AUD,
  },
  {
    name: 'computer',
    priceA: 1000,
    priceB: 2200,
    priceC: 3500,
    currencyCode: Code.GBP,
  },
  { name: 'mug', priceA: 10, priceB: 15, priceC: 20, currencyCode: Code.EUR },
  {
    name: 'headset',
    priceA: 100,
    priceB: 150,
    priceC: 220,
    currencyCode: Code.CAD,
  },
  { name: 'cable', priceA: 5, priceB: 10, priceC: 15, currencyCode: Code.EUR },
  {
    name: 'table',
    priceA: 100,
    priceB: 20,
    priceC: 500,
    currencyCode: Code.EUR,
  },
];
