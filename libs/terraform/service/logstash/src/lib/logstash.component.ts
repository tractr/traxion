import { CloudwatchUserComponent } from './cloudwatch-user.component';
import { LOGSTASH_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  LogstashComponentArtifacts,
  LogstashComponentConfig,
  LogstashComponentDefaultConfig,
} from './interfaces';
import { LogstashContainer } from './logstash.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import { Container, ServiceComponent } from '@tractr/terraform-service-ecs';

export class LogstashComponent extends ServiceComponent<
  LogstashComponentConfig,
  LogstashComponentDefaultConfig,
  LogstashComponentArtifacts
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

  protected createComponents() {
    super.createComponents();
    const cloudwatch = this.createCloudwatchUser();
    this.artifacts.cloudwatch = cloudwatch.artifacts;
  }

  protected createCloudwatchUser() {
    return new CloudwatchUserComponent(this, 'cw', {});
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
