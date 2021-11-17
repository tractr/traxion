import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { NESTJS_MESSAGE_BROKER_ALERT_QUEUE } from '../constants';

import {
  MessageBrokerAlert,
  MessageBrokerAlertSubscribe,
} from '@cali/message-broker-alert';
import { ALERT_SERVICE, AlertService } from '@cali/nestjs-common';
import { PUB_SUB_SERVICE } from '@cali/nestjs-pub-sub';

@Injectable()
export class AlertSubscriber {
  constructor(
    // TODO: add logger
    @Inject(ALERT_SERVICE) private readonly alertService: AlertService,
    @Inject(PUB_SUB_SERVICE) private readonly pubSub: PubSub,
  ) {}

  /**
   * Handle new alerts received from the message broker by inserting
   * it into the database
   *
   * @param messageBrokerAlert - Alert coming from the message broker
   */
  @MessageBrokerAlertSubscribe({
    queue: NESTJS_MESSAGE_BROKER_ALERT_QUEUE,
    routingKey: '',
  })
  async handleNewAlerts({
    cameraExternalId,
    ...messageBrokerAlert
  }: MessageBrokerAlert) {
    try {
      // Insert new alert in database
      const alert = await this.alertService.create({
        data: {
          ...messageBrokerAlert,
          camera: { connect: { externalId: cameraExternalId } },
          createdAt: this.alertService.getDefaultCreatedAt(),
          videoStatus: this.alertService.getDefaultVideoStatus(),
          videoUrl: this.alertService.getDefaultVideoUrl(),
        },
      });

      // Send an alertCreated graphql notification
      await this.pubSub.publish('alertCreated', {
        alertCreated: { id: alert.id },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
