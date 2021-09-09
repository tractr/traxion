import { Injectable } from '@nestjs/common';

import { MessageBrokerAlertSubscribe } from '@cali/message-broker-alert';

@Injectable()
export class AppService {
  @MessageBrokerAlertSubscribe({
    queue: 'alert_queue',
    routingKey: '',
  })
  handleAlert(message) {
    console.info('ALERT MESSAGE: ', message);
  }
}
