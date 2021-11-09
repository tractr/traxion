import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cali-alert-tabs',
  templateUrl: './alert-tabs.component.html',
  styleUrls: ['./alert-tabs.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTabsComponent {
  constructor(public translateService: TranslateService) {}
}
