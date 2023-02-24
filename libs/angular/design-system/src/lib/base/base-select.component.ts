import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, Validator } from '@angular/forms';

import { BaseFormControlComponent } from './base-form-control.component';
import { SelectOptionInterface } from '../interfaces';

@Component({
  template: '',
})
export abstract class BaseSelectComponent
  extends BaseFormControlComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @ViewChild('select') select!: ElementRef;

  options: SelectOptionInterface[] = [];
}
