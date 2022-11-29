import { LogstashContainerConfig } from './interfaces';

import { Container } from '@trxn/terraform-service-ecs';

export class LogstashContainer extends Container<LogstashContainerConfig> {
  protected getAppName(): string {
    return 'tractr/logstash-input-cloudwatch';
  }
}
