import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'tractr-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.less'],
})
export class FormButtonComponent {
  @Input() form?: UntypedFormGroup;

  @Input() label!: string;

  @Input() type: NzButtonType = 'primary';

  @Input() size: NzButtonSize = 'default';

  @Input() loading = false;
}
