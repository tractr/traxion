import { random } from 'faker';
import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import { fetchCameraExternalIds } from '../helpers';

import { mockNumFrame } from '@cali/common-business';
import {
  MessageBrokerPredictionLogService,
  mockPredictionLog,
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
    const randomCameraExternalId = random.arrayElement(
      await fetchCameraExternalIds(),
    );

    try {
      await this.messageBrokerPredictionLog.publish({
        routingKey: '',
        message: mockPredictionLog({
          num_frame: mockNumFrame(randomCameraExternalId),
        }),
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

    const cameraExternalIds = random.arrayElements(
      await fetchCameraExternalIds(),
      cameraQuantityNumber,
    );

    try {
      interval(timeIntervalNumber)
        .pipe(
          map(() =>
            cameraExternalIds.map((cameraExternalId) =>
              this.messageBrokerPredictionLog.publish({
                routingKey: '',
                message: mockPredictionLog({
                  num_frame: mockNumFrame(cameraExternalId),
                }),
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
}
