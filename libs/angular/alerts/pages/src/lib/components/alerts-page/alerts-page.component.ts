import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cali-alerts-page',
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertsPageComponent {
  constructor(public translateService: TranslateService) {}
}
