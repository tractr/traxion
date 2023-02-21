import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';

import { BaseInputDateComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-datetime-ui',
  templateUrl: './input-datetime-ui.component.html',
  styleUrls: ['./input-datetime-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputDatetimeUiComponent
  extends BaseInputDateComponent
  implements OnInit, ControlValueAccessor, Validator
{
  override prefixId = 'trxn-input-datetime-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
