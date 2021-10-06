import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { Camera } from '../models/camera.model';

import { MessageBrokerCameraStatusSubscribe } from '@cali/message-broker-camera-status';

const pubSub = new PubSub();

@Resolver(() => Camera)
export class CameraResolver {
  @Subscription(() => Camera, {
    name: 'cameraUpdate',
  })
  cameraUpdateHandler() {
    return pubSub.asyncIterator('cameraUpdate');
  }

  @MessageBrokerCameraStatusSubscribe({
    queue: 'gql-camera-status',
    routingKey: '',
  })
  async handleCameraUpdate(camera) {
    console.info('CAMERA STATUS GRAPHQL', camera);
    await pubSub.publish('cameraUpdate', {
      cameraUpdate: { id: camera.idcamera, status: camera.status },
    });
  }
}
