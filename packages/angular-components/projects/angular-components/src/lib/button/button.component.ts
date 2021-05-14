import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
  @Input() type: 'primary'|'dashed'|'link'|'text'|'default' = 'default';

  constructor() { }

  ngOnInit(): void {
  }

}
