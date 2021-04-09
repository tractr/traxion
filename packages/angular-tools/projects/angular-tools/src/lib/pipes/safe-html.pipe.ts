import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: any, args?: any): any {
		if (args && args === 'style') {
			return this.sanitizer.bypassSecurityTrustStyle(value);
		} else if (args && args === 'html') {
			return this.sanitizer.bypassSecurityTrustHtml(value);
		} else {
			return this.sanitizer.bypassSecurityTrustResourceUrl(value);
		}
	}
}
