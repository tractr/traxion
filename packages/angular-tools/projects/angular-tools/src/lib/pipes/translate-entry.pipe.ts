import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
	name: 'translateEntry',
	pure: false,
})
export class TranslateEntryPipe implements PipeTransform {
	constructor(private _translateService: TranslateService) {}

	transform(value: any, args?: any): any {
		if (
			this._translateService.currentLang !==
			this._translateService.defaultLang
		) {
			const key = `${args}__${this._translateService.currentLang}`;
			if (value[key]) {
				return value[key];
			}
		}
		return value[args];
	}
}
