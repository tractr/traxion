import { Component, Input } from '@angular/core';

@Component({
  selector: 'tractr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
})
export class ButtonComponent {
  @Input() type: 'primary' | 'dashed' | 'link' | 'text' | 'default' = 'default';
}
