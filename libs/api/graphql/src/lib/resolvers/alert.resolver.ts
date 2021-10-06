import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Alert } from '../models';

import { MessageBrokerAlertSubscribe } from '@cali/message-broker-alert';

const pubSub = new PubSub();

@Resolver(() => Alert)
export class AlertResolver {
  @Subscription(() => Alert, {
    name: 'newAlert',
  })
  newAlertHandler() {
    return pubSub.asyncIterator('newAlert');
  }

  @MessageBrokerAlertSubscribe({
    queue: 'gql-alert',
    routingKey: '',
  })
  async handleAlert(alert) {
    console.info('ALERT MESSAGE GRAPHQL: ', alert);
    await pubSub.publish('newAlert', { newAlert: alert });
  }
}
