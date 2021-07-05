import { Component, Input } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { InputBaseComponent } from '../input-base.component';

@Component({
  selector: 'tractr-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.less'],
})
export class InputNumberComponent extends InputBaseComponent<number> {
  /** Min value accepted */
  @Input() min = -Infinity;

  /** Max value accepted */
  @Input() max = Infinity;

  /** Interval between two values */
  @Input() step = 1;

  /** Ant input's size */
  @Input() size: NzSizeLDSType = 'default';
}
