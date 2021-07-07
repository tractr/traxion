import { Component, Input, OnInit } from '@angular/core';
import { NzSelectModeType } from 'ng-zorro-antd/select';

import { SelectBaseComponent } from '../select-base.component';

@Component({
  selector: 'tractr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent extends SelectBaseComponent implements OnInit {
  /** Multiple */
  private multipleState = false;

  @Input()
  get multiple(): boolean {
    return this.multipleState;
  }

  set multiple(multiple: boolean) {
    this.multipleState = multiple;
    this.mode = this.multipleState ? 'multiple' : 'default';
  }

  mode: NzSelectModeType = 'default';
}
