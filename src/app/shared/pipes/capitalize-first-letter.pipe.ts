import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter',
  standalone: true,
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (value === null) {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
  }
}
