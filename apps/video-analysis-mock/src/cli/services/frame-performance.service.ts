import { datatype } from 'faker';
import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import { FramePerformance } from '@cali/common';
import { MessageBrokerFramePerformanceService } from '@cali/message-broker-frame-performance';

@Console({
  command: 'frame-performance',
  description: 'send frame performance log to message broker',
})
export class FramePerformanceService {
  constructor(
    private messageBrokerFramePerformanceService: MessageBrokerFramePerformanceService,
  ) {}

  @Command({
    command: 'publish-one',
    description: 'publish a random alert',
  })
  public async publishOne() {
    try {
      await this.messageBrokerFramePerformanceService.publish({
        routingKey: '',
        message: this.mockFramePerformance(),
      });
    } catch (e) {
      console.error(e);
    }
  }

  @Command({
    command: 'publish-interval <timeInterval> <cameraQuantity>',
    description:
      'publish frame performance logs at the specified interval (ms)',
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
            cameras.map((idcamera) =>
              this.messageBrokerFramePerformanceService.publish({
                routingKey: '',
                message: this.mockFramePerformance({ idcamera }),
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

  private mockFramePerformance(
    framePerformance: Partial<FramePerformance> = {},
  ): FramePerformance {
    const now = Date.now();

    return {
      numframe: datatype.number(),
      idcamera: datatype.number(),
      ingestPerformance: {
        time: now,
        tingest: datatype.number(),
      },
      preprocessingPerformance: {
        time: now,
        delay: datatype.number(),
        tprepro: datatype.number(),
      },
      ...framePerformance,
    };
  }
}
