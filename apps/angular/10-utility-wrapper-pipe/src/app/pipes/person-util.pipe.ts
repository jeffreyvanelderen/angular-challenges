import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from '../person.utils';

type PersonUtilType = typeof PersonUtils;

@Pipe({
  pure: true,
  name: 'personUtil',
})
export class PersonUtilPipe implements PipeTransform {
  //  Method typed based on the function name of PersonUtils (including params + return type based on fn name)
  transform<T extends keyof PersonUtilType>(
    functionName: T,
    ...params: Parameters<PersonUtilType[T]>
  ): ReturnType<PersonUtilType[T]> {
    const fn = PersonUtils[functionName] as Function; // We do need to type as Function to get rid of TS warnings

    return fn(...params);
  }
}
