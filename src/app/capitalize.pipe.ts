import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return (
      value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1)
    );
  }
}
