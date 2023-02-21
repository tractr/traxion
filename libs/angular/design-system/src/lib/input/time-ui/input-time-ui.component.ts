import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  ReactiveFormsModule,
  Validator,
} from '@angular/forms';

import { BaseInputTextComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-time-ui',
  templateUrl: './input-time-ui.component.html',
  styleUrls: ['./input-time-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputTimeUiComponent
  extends BaseInputTextComponent
  implements OnInit, ControlValueAccessor, Validator
{
  override prefixId = 'trxn-input-time-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
