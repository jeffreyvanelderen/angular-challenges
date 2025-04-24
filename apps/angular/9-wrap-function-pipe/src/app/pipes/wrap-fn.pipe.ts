import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  pure: true,
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform(fn: Function, ...params: unknown[]) {
    return fn(params);
  }
}
