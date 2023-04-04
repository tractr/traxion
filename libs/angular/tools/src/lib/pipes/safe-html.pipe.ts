import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeStyle,
} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: string,
    args?: string,
  ): SafeStyle | SafeHtml | SafeResourceUrl {
    if (args && args === 'style') {
      return this.sanitizer.bypassSecurityTrustStyle(value);
    }
    if (args && args === 'html') {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
