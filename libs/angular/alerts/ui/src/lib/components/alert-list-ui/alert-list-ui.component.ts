import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list-ui',
  templateUrl: './alert-list-ui.component.html',
  styleUrls: ['./alert-list-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListUiComponent {
  @Input() alerts!: Alert[];
}
