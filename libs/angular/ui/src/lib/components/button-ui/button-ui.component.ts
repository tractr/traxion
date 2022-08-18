import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tractr-button-ui',
  templateUrl: './button-ui.component.html',
  styleUrls: ['./button-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonUiComponent {
  @Input() label!: string;
  @Input() disabled!: boolean;
}
