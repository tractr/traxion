import { Injectable } from '@angular/core';
import { gql, Subscription } from 'apollo-angular';

@Injectable()
export class AlertCreatedGql extends Subscription<{
  alertCreated: { id: string };
}> {
  document = gql`
    subscription {
      alertCreated {
        id
      }
    }
  `;
}
