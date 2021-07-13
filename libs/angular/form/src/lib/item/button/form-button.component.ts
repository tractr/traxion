import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'tractr-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.less'],
})
export class FormButtonComponent {
  @Input() form?: FormGroup;

  @Input() label!: string;

  @Input() type: NzButtonType = 'primary';

  @Input() size: NzButtonSize = 'default';
}
