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
  selector: 'trxn-input-text-ui',
  templateUrl: './input-text-ui.component.html',
  styleUrls: ['./input-text-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputTextUiComponent
  extends BaseInputTextComponent
  implements OnInit, ControlValueAccessor, Validator
{
  override prefixId = 'trxn-input-text-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Text';
  }
}
