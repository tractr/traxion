import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseInputTextComponent } from '../../base';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-input-email-ui',
  templateUrl: './input-email-ui.component.html',
  styleUrls: ['./input-email-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailUiComponent
  extends BaseInputTextComponent
  implements OnInit
{
  @Input() placeholder?: string;

  override prefixId = 'trxn-input-email-ui-';

  override ngOnInit(): void {
    super.ngOnInit();
    this.placeholder = this.placeholder ?? 'Email';
  }
}
