import { Injectable } from '@nestjs/common';

import { MessageBrokerAlertSubscribe } from '@cali/message-broker-alert';

@Injectable()
export class AppService {
  /**
   * Log Alersts from message broker into the console
   *
   * @param alert - Alert to log, coming from the message broker
   */
  @MessageBrokerAlertSubscribe({
    queue: 'alert_logs',
    routingKey: '',
  })
  logAlert(alert) {
    console.info('ALERT MESSAGE: ', alert);
  }
}
