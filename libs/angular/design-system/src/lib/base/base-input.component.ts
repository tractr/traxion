import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntil } from 'rxjs';

import { BaseFormControlComponent } from './base-form-control.component';

@Component({
  template: '',
})
export abstract class BaseInputComponent
  extends BaseFormControlComponent
  implements OnDestroy, OnInit
{
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  override ngOnInit(): void {
    super.ngOnInit();

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }
}
