import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AlertFeedback } from '../models';

import { PUB_SUB_SERVICE, PubSubQueue } from '@cali/nestjs-pub-sub';

@Resolver(() => AlertFeedback)
export class AlertFeedbackResolver {
  constructor(@Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub) {}

  /**
   * Subscribe to AlertFeedback creation notification
   * @returns an alertFeedback created iterator
   */
  @Subscription(() => AlertFeedback, {
    name: PubSubQueue.alertFeedbackCreated,
  })
  alertFeedbackCreatedHandler() {
    return this.pubSub.asyncIterator(PubSubQueue.alertFeedbackCreated);
  }
}
