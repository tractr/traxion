import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'max',
})
export class MaxPipe implements PipeTransform {
  transform(value: number | string, max: number | string): number {
    return Math.min(Number(value), Number(max));
  }
}
