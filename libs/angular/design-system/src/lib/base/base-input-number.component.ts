import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseInputComponent } from './base-input.component';

@Component({
  template: '',
})
export abstract class BaseInputNumberComponent extends BaseInputComponent {
  value$ = new Subject<number | undefined>();

  @Input() placeholder?: string;
}
