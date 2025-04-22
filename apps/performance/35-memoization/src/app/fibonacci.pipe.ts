import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  pure: true,
  name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {
  transform(value: number, ..._: any[]) {
    return fibonacci(value);
  }
}

// In a real project, this method would exist in a util or helper file
const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
