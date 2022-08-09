import { LOGSTASH_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  LogstashComponentConfig,
  LogstashComponentDefaultConfig,
} from './interfaces';
import { LogstashContainer } from './logstash.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import { Container, ServiceComponent } from '@tractr/terraform-service-ecs';

export class LogstashComponent extends ServiceComponent<
  LogstashComponentConfig,
  LogstashComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: LogstashComponentConfig,
  ) {
    super(scope, id, config, LOGSTASH_COMPONENT_DEFAULT_CONFIG);
  }

  protected getContainers(): Container[] {
    return [
      new LogstashContainer(this, {
        ...this.config.containerConfig,
        name: 'logstash',
      }),
    ];
  }
}
