import { Component, OnInit } from '@angular/core';

import { SelectBaseComponent } from '../select-base.component';

@Component({
  selector: 'tractr-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.less'],
})
export class RadioComponent extends SelectBaseComponent implements OnInit {}
