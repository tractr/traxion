import { Component, Input } from '@angular/core';

@Component({
  selector: 'tractr-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.less'],
})
export class FormItemComponent {
  @Input() name!: string;

  @Input() label: string | undefined = 'GLENN:';
}
