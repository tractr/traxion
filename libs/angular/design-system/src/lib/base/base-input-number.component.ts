import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseInputComponent } from './base-input.component';

@Component({
  template: '',
})
export abstract class BaseInputNumberComponent extends BaseInputComponent {
  value$ = new Subject<number | undefined>();

  override onChange = (event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value, 10);

    this.value$.next(Number.isNaN(value) ? undefined : value);
  };
}
