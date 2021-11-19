import { Injectable } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';

@Injectable()
export class AlertUpdatedGql extends Subscription<{
  alertUpdated: { id: string };
}> {
  document = gql`
    subscription {
      alertUpdated {
        id
      }
    }
  `;
}
