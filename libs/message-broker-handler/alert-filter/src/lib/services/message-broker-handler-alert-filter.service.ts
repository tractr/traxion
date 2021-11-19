/* eslint-disable camelcase */
import { Injectable } from '@nestjs/common';
import { AlertType } from '@prisma/client';

import { parseNumFrame } from '@cali/common-business';
import {
  MessageBrokerAlert,
  MessageBrokerAlertService,
} from '@cali/message-broker-alert';
import {
  MessageBrokerPredictionLog,
  MessageBrokerPredictionLogSubscribe,
} from '@cali/message-broker-prediction-log';

@Injectable()
export class MessageBrokerHandlerAlertFilterService {
  constructor(
    private readonly messageBrokerAlertService: MessageBrokerAlertService,
  ) {}

  /**
   * Filter alerts from prediction logs and push them into the
   * appropriate exchange
   *
   * @param predictionLog - Prediction log coming from the message broker
   */
  @MessageBrokerPredictionLogSubscribe({
    queue: 'alert-filter',
    routingKey: '',
  })
  filterAlerts(predictionLog: MessageBrokerPredictionLog) {
    if (predictionLog.alert) {
      const alert = this.formatPredictionLogToAlert(predictionLog);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.messageBrokerAlertService.publish({
        routingKey: '',
        message: alert,
      });
    }
  }

  /**
   * Format a prediction log into an alert
   *
   * @param predictionLog - a prediction log object coming from the message broker
   * @returns an alert object
   */
  formatPredictionLogToAlert({
    class: alert_class,
    num_frame,
    id_model_decision,
    id_model_prediction,
  }: MessageBrokerPredictionLog): MessageBrokerAlert {
    const { cameraId } = parseNumFrame(num_frame);

    return {
      type: alert_class as AlertType,
      cameraExternalId: cameraId,
      externalFrameId: num_frame,
      externalModelDecisionId: id_model_decision,
      externalModelPredictionId: id_model_prediction,
    };
  }
}
