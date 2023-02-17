import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BaseUiComponent } from '../../base/base-ui.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-email-ui',
  templateUrl: './input-email-ui.component.html',
  styleUrls: ['./input-email-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailUiComponent
  extends BaseUiComponent
  implements OnInit, OnDestroy, ControlValueAccessor, Validator
{
  @ViewChild('input') input!: ElementRef;

  value$ = new Subject<string>();

  override prefixId = 'trxn-input-email-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Email';

    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      if (this.input) this.input.nativeElement.value = value;
    });
  }
}
