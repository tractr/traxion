import { Inject, Injectable } from '@angular/core';

import { ANGULAR_REXT_CONFIGURATION } from '../generated/constants';
import { AngularRextConfiguration } from '../generated/interfaces';

import { AlertWithCurrentFeedbackService as BaseAlertWithCurrentFeedbackService } from '@cali/common-rext-client';

@Injectable()
export class AlertWithCurrentFeedbackService extends BaseAlertWithCurrentFeedbackService {
  constructor(
    @Inject(ANGULAR_REXT_CONFIGURATION)
    private configuration: AngularRextConfiguration,
  ) {
    super(configuration.api.url);
  }
}
