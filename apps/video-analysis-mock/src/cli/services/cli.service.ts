import { Command, Console } from 'nestjs-console';

import { MessageBrokerAlertService } from '@cali/message-broker-alert';

@Console({
  command: 'alert',
  description: 'send fake logs to the message broker',
})
export class CliService {
  constructor(private messageBrokerAlertService: MessageBrokerAlertService) {}

  @Command({
    command: 'publish-one',
    description: 'publish a random alert',
  })
  public async publishOne() {
    try {
      await this.messageBrokerAlertService.publish({
        routingKey: '',
        message: {
          type: 'test',
          camera: 'test',
          time: new Date(),
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
