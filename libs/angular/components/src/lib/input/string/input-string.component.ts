import { Component, Input } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { InputBaseComponent } from '../input-base.component';

@Component({
  selector: 'tractr-input-string',
  templateUrl: './input-string.component.html',
  styleUrls: ['./input-string.component.less'],
})
export class InputStringComponent extends InputBaseComponent<string> {
  /** Input's type accepted */
  @Input() type: 'text' | 'email' | 'password' = 'text';

  /** Enable autocomplete */
  @Input() autocomplete?: 'on' | 'off' = 'off';

  /** Input's placeholder */
  @Input() placeholder = '';

  /** Ant input's size */
  @Input() size: NzSizeLDSType = 'default';

  passwordVisible = false;
}
