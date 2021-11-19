import { random } from 'faker';
import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import { fetchCameraExternalIds } from '../helpers';

import { mockNumFrame, parseNumFrame } from '@cali/common-business';
import {
  MessageBrokerAlertService,
  mockAlert,
} from '@cali/message-broker-alert';

@Console({
  command: 'alert',
  description: 'send camera alert the message broker',
})
export class AlertService {
  constructor(private messageBrokerAlertService: MessageBrokerAlertService) {}

  @Command({
    command: 'publish-one',
    description: 'publish a random alert',
  })
  public async publishOne() {
    const randomCameraExternalId = random.arrayElement(
      await fetchCameraExternalIds(),
    );
    const mockedNumFrame = mockNumFrame(randomCameraExternalId);
    const { cameraId } = parseNumFrame(mockedNumFrame);

    try {
      await this.messageBrokerAlertService.publish({
        routingKey: '',
        message: mockAlert({
          cameraExternalId: cameraId,
          externalFrameId: mockedNumFrame,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  @Command({
    command: 'publish-interval <timeInterval>',
    description: 'publish alerts at the specified interval (ms)',
  })
  public async publishInterval(timeInterval: string) {
    const timeIntervalNumber = parseInt(timeInterval, 10);
    const randomCameraExternalId = random.arrayElement(
      await fetchCameraExternalIds(),
    );

    if (Number.isNaN(timeIntervalNumber))
      throw Error('Time interval must be an integer');

    try {
      interval(timeIntervalNumber)
        .pipe(
          map(() => {
            const mockedNumFrame = mockNumFrame(randomCameraExternalId);
            const { cameraId } = parseNumFrame(mockedNumFrame);
            return this.messageBrokerAlertService.publish({
              routingKey: '',
              message: mockAlert({
                cameraExternalId: cameraId,
                externalFrameId: mockedNumFrame,
              }),
            });
          }),
          tap(() => console.info(`Send alert`)),
        )
        .subscribe();
    } catch (e) {
      console.error(e);
    }
  }
}
