import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Camera } from '../models/camera.model';

const pubSub = new PubSub();

@Resolver(() => Camera)
export class CameraResolver {
  @Subscription(() => Camera, {
    name: 'cameraUpdate',
  })
  cameraUpdateHandler() {
    return pubSub.asyncIterator('cameraUpdate');
  }
}
