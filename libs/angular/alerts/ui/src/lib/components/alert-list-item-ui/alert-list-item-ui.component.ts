import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-list-item-ui',
  templateUrl: './alert-list-item-ui.component.html',
  styleUrls: ['./alert-list-item-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListItemUiComponent {
  @Input() alert!: Alert;

  constructor(public translateService: TranslateService) {}
}
