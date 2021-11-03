import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Alert } from '../models';

import { MessageBrokerAlertSubscribe } from '@cali/message-broker-alert';

const pubSub = new PubSub();

@Resolver(() => Alert)
export class AlertResolver {
  @Query(() => Alert)
  getAlert() {
    return {
      camera: 'test',
      type: 'test',
      time: 'test',
    };
  }

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
    return pubSub.publish('newAlert', { newAlert: alert });
  }
}
