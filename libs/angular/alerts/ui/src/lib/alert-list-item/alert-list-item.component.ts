import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list-item',
  templateUrl: './alert-list-item.component.html',
  styleUrls: ['./alert-list-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListItemComponent {
  @Input() alert!: Alert;

  constructor(public translateService: TranslateService) {}
}
