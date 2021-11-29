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
      // Get default value for the new alert
      const { createdAt, videoStatus, videoUrl } =
        this.alertService.getDefaultInternals();

      // Insert new alert in database
      await this.alertService.create({
        data: {
          ...messageBrokerAlert,
          createdAt,
          camera: { connect: { externalId: cameraExternalId } },
          videoStatus,
          videoUrl,
          // Init the first and empty alert feedback
          alertFeedbacks: {
            create: {
              createdAt,
              isArchived: false,
            },
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
