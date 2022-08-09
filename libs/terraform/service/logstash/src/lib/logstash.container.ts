import { LogstashContainerConfig } from './interfaces';

import { Container } from '@tractr/terraform-service-ecs';

export class LogstashContainer extends Container<LogstashContainerConfig> {
  protected getAppName(): string {
    return 'logstash';
  }
}
