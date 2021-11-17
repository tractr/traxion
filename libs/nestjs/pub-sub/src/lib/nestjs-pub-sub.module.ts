import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { PUB_SUB_SERVICE } from './constants';

const pubSub = new PubSub();

@Module({
  providers: [{ provide: PUB_SUB_SERVICE, useValue: pubSub }],
  exports: [PUB_SUB_SERVICE],
})
export class NestjsPubSubModule {}
