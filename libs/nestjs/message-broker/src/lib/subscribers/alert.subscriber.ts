import { Inject, Injectable } from '@nestjs/common';

import { NESTJS_MESSAGE_BROKER_ALERT_QUEUE } from '../constants';

import {
  MessageBrokerAlert,
  MessageBrokerAlertSubscribe,
} from '@cali/message-broker-alert';
import { ALERT_SERVICE, AlertService } from '@cali/nestjs-common';

@Injectable()
export class AlertSubscriber {
  constructor(
    // TODO: add logger
    @Inject(ALERT_SERVICE) private readonly alertService: AlertService, // private readonly logger: Logger,
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
      await this.alertService.create({
        data: {
          ...messageBrokerAlert,
          camera: { connect: { externalId: cameraExternalId } },
          createdAt: this.alertService.getDefaultCreatedAt(),
          videoStatus: this.alertService.getDefaultVideoStatus(),
          videoUrl: this.alertService.getDefaultVideoUrl(),
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
