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
  selector: 'trxn-input-password-ui',
  templateUrl: './input-password-ui.component.html',
  styleUrls: ['./input-password-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class InputPasswordUiComponent
  extends BaseInputTextComponent
  implements OnInit, ControlValueAccessor, Validator
{
  showPassword = false;

  override prefixId = 'trxn-input-password-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
