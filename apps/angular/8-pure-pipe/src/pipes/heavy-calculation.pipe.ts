import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  pure: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, ...[index]: string | number[]) {
    return `${name} - ${index}`;
  }
}
