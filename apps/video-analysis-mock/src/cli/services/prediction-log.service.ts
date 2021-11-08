import { AlertAlertType } from '@prisma/client';
import { datatype } from 'faker';
import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import {
  MessageBrokerPredictionLog,
  MessageBrokerPredictionLogService,
} from '@cali/message-broker-prediction-log';

@Console({
  command: 'prediction-log',
  description: 'send prediction log to the message broker',
})
export class FramePerformanceService {
  constructor(
    private messageBrokerPredictionLog: MessageBrokerPredictionLogService,
  ) {}

  @Command({
    command: 'publish-one',
    description: 'publish a random prediction log',
  })
  public async publishOne() {
    try {
      await this.messageBrokerPredictionLog.publish({
        routingKey: '',
        message: this.mockPredictionLog(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  @Command({
    command: 'publish-interval <timeInterval> <cameraQuantity>',
    description: 'publish prediction logs at the specified interval (ms)',
  })
  public async publishInterval(timeInterval: string, cameraQuantity: string) {
    const timeIntervalNumber = parseInt(timeInterval, 10);
    const cameraQuantityNumber = parseInt(cameraQuantity, 10);

    if (Number.isNaN(timeIntervalNumber))
      throw Error('Time interval must be an integer');

    if (Number.isNaN(cameraQuantityNumber))
      throw Error('Time camera quantity must be an integer');

    const cameras = [...Array(cameraQuantityNumber).keys()];

    try {
      interval(timeIntervalNumber)
        .pipe(
          map(() =>
            cameras.map(() =>
              this.messageBrokerPredictionLog.publish({
                routingKey: '',
                message: this.mockPredictionLog(),
              }),
            ),
          ),
          tap(() => console.info(`Send framePerformanceAlert`)),
        )
        .subscribe();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Generate a random prediction log
   *
   * @param predictionLog - override the generated prediction log
   * @returns the generated prediction log
   */
  private mockPredictionLog(
    predictionLog: Partial<MessageBrokerPredictionLog> = {},
  ): MessageBrokerPredictionLog {
    return {
      num_frame: '1',
      classes: [datatype.string()],
      probas: [datatype.number(1)],
      class: AlertAlertType.thief,
      alert: true, // datatype.boolean(),
      delay: datatype.number(100),
      t_ingest: datatype.number(100),
      t_prepro: datatype.number(100),
      t_inference: datatype.number(100),
      usage_cpu_inf: datatype.number(100),
      usage_memoire_inf: datatype.number(100),
      t_decision: datatype.number(100),
      id_model_prediction: datatype.string(),
      id_model_decision: datatype.string(),
      ...predictionLog,
    };
  }
}
