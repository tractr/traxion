import { Command, Console } from 'nestjs-console';
import { interval, map, tap } from 'rxjs';

import { MessageBrokerAlertService } from '@cali/message-broker-alert';

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
      await this.messageBrokerAlertService.publish(this.mockAlert());
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
          map(() => this.messageBrokerAlertService.publish(this.mockAlert())),
          tap(() => console.info(`Send alert`)),
        )
        .subscribe();
    } catch (e) {
      console.error(e);
    }
  }

  private mockAlert() {
    return {
      routingKey: '',
      message: {
        type: 'test',
        camera: 'test',
        time: new Date(),
      },
    };
  }
}
