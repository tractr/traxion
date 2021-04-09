import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'min',
})
export class MinPipe implements PipeTransform {
	transform(value: number | string, max: number | string): number {
		return Math.max(Number(value), Number(max));
	}
}
