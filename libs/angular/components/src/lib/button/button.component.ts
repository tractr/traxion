import { Component, Input } from '@angular/core';
import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'tractr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
  @Input() type: NzButtonType = 'default';

  @Input() size: NzButtonSize = 'default';

  @Input() disabled = false;

  @Input() loading = false;
}
