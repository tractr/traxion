import { Injectable } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';

@Injectable()
export class AlertFeedbackCreatedGql extends Subscription<{
  alertFeedbackCreated: { id: string; alertId: string };
}> {
  document = gql`
    subscription {
      alertFeedbackCreated {
        id
        alertId
      }
    }
  `;
}
