import { AlertAlertType } from '@prisma/client';
import { datatype } from 'faker';
import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import {
  MessageBrokerAlert,
  MessageBrokerAlertService,
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
    try {
      await this.messageBrokerAlertService.publish({
        routingKey: '',
        message: this.mockAlert(),
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

    if (Number.isNaN(timeIntervalNumber))
      throw Error('Time interval must be an integer');

    try {
      interval(timeIntervalNumber)
        .pipe(
          map(() =>
            this.messageBrokerAlertService.publish({
              routingKey: '',
              message: this.mockAlert(),
            }),
          ),
          tap(() => console.info(`Send alert`)),
        )
        .subscribe();
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Generate a random prediction alert
   *
   * @param alert - override the generated alert
   * @returns the generated alert
   */
  private mockAlert(
    alert: Partial<MessageBrokerAlert> = {},
  ): MessageBrokerAlert {
    return {
      alertType: AlertAlertType.thief,
      cameraExternalId: datatype.string(),
      externalFrameId: datatype.string(),
      externalModelDecisionId: datatype.string(),
      externalModelPredictionId: datatype.string(),
      ...alert,
    };
  }
}
