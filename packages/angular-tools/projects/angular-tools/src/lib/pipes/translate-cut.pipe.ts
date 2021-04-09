import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'translateCut',
})
export class TranslateCutPipe implements PipeTransform {
	transform(value: string, index: string | number): string {
		const cutIndex = Number(index);
		return value.split('|')[cutIndex];
	}
}
