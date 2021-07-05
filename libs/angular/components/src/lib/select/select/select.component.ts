/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';

import { SelectBaseComponent } from '../select-base.component';

@Component({
  selector: 'tractr-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent
  extends SelectBaseComponent<any>
  implements OnInit {}
