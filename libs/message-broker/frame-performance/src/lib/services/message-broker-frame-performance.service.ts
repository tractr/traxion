import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE } from '../constants';

import { FramePerformance } from '@cali/common';
import {
  MessageBrokerPublishParams,
  MessageBrokerService,
} from '@cali/message-broker-common';

@Injectable()
export class MessageBrokerFramePerformanceService
  implements MessageBrokerService<FramePerformance>
{
  constructor(private messageBrokerService: AmqpConnection) {}

  public publish({
    routingKey,
    message,
    options,
  }: MessageBrokerPublishParams<FramePerformance>) {
    return this.messageBrokerService.publish(
      MESSAGE_BROKER_FRAME_PERFORMANCE_EXCHANGE,
      routingKey,
      message,
      options,
    );
  }
}
