import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseInputComponent } from './base-input.component';

@Component({
  template: '',
})
export abstract class BaseInputTextComponent extends BaseInputComponent {
  value$ = new Subject<string>();
}
