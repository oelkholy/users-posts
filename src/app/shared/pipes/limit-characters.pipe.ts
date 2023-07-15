import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitCharacters'
})
export class LimitCharactersPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return (value.length > limit) 
      ? value.slice(0, limit) + '...' 
      : value;
  }

}
