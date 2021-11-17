import { Inject } from '@nestjs/common';
import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Alert } from '../models';

import { PUB_SUB_SERVICE } from '@cali/nestjs-pub-sub';

@Resolver(() => Alert)
export class AlertResolver {
  constructor(@Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub) {}

  @Query(() => Alert)
  getAlert() {
    return {
      id: 'test',
    };
  }

  @Subscription(() => Alert, {
    name: 'alertCreated',
  })
  alertCreatedHandler() {
    return this.pubSub.asyncIterator('alertCreated');
  }
}
