import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AlertService } from '@cali/common-angular-rext-client';
import { Alert } from '@cali/common-models';

@Component({
  selector: 'cali-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsComponent implements OnInit {
  @Input() idAlert!: string;

  alert$!: Observable<Alert>;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alert$ = this.loadAlert();
  }

  loadAlert() {
    return this.alertService.findUnique$({ id: this.idAlert });
  }
}
