import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateEntry',
  pure: false,
})
export class TranslateEntryPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: { [key: string]: string }, args: string): string {
    if (
      this.translateService.currentLang !== this.translateService.defaultLang
    ) {
      const key = `${args}__${this.translateService.currentLang}`;
      if (value[key]) {
        return value[key];
      }
    }
    return value[args];
  }
}
