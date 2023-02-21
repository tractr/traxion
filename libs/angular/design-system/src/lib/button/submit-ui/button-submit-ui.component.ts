import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'trxn-button-submit-ui',
  templateUrl: './button-submit-ui.component.html',
  styleUrls: ['./button-submit-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSubmitUiComponent {
  @Input() disabled!: boolean;
}
