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
  selector: 'trxn-input-date-ui',
  templateUrl: './input-date-ui.component.html',
  styleUrls: ['./input-date-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputDateUiComponent
  extends BaseInputDateComponent
  implements OnInit, ControlValueAccessor, Validator
{
  override prefixId = 'trxn-input-date-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
