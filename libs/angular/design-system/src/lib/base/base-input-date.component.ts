import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseInputComponent } from './base-input.component';

@Component({
  template: '',
})
export abstract class BaseInputDateComponent extends BaseInputComponent {
  value$ = new Subject<Date | undefined>();

  override onChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value$.next(value ? new Date(value) : undefined);
  };
}
