import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, Validator } from '@angular/forms';
import { takeUntil } from 'rxjs';

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

  override ngOnInit(): void {
    super.ngOnInit();

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.select) this.select.nativeElement.value = value;
    });
  }

  override onChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.value$.next(value === '' ? undefined : value);
  };
}
