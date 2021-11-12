import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-details-ui',
  templateUrl: './alert-details-ui.component.html',
  styleUrls: ['./alert-details-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsUiComponent {
  @Input() alert!: Alert;
}
