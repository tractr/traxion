import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cali-alert-list-in-progress',
  templateUrl: './alert-list-in-progress.component.html',
  styleUrls: ['./alert-list-in-progress.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertListInProgressComponent {}
