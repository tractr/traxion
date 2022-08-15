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
  protected cloudwatchUser: CloudwatchUserComponent | undefined;

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
    const cloudwatch = this.createCloudwatchUserOnce();
    this.artifacts.cloudwatch = cloudwatch.artifacts;
  }

  protected createCloudwatchUserOnce() {
    if (!this.cloudwatchUser) {
      this.cloudwatchUser = new CloudwatchUserComponent(this, 'cw', {});
    }
    return this.cloudwatchUser;
  }

  protected getContainers(): Container[] {
    // ----------------------------------
    // Inject cloudwatch access key
    const config = this.config.containerConfig;
    const cloudwatch = this.createCloudwatchUserOnce();
    config.environments.CLOUDWATCH_KEY_ID = cloudwatch.artifacts.accessKey.id;
    config.environments.CLOUDWATCH_KEY_SECRET =
      cloudwatch.artifacts.accessKey.secret;
    // ----------------------------------

    return [
      new LogstashContainer(this, {
        ...config,
        name: 'logstash',
      }),
    ];
  }
}
