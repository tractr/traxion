import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListComponent {
  @Input() alerts!: Alert[];
}
