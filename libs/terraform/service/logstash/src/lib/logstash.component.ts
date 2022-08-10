import { ecs } from '@cdktf/provider-aws';

import { LOGSTASH_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  LogstashComponentConfig,
  LogstashComponentDefaultConfig,
} from './interfaces';
import { LogstashTaskRoleComponent } from './logstash-task-role.component';
import { LogstashContainer } from './logstash.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import {
  Container,
  ServiceComponent,
  VolumeComponents,
} from '@tractr/terraform-service-ecs';

export class LogstashComponent extends ServiceComponent<
  LogstashComponentConfig,
  LogstashComponentDefaultConfig
> {
  protected taskRoleArn: LogstashTaskRoleComponent | undefined;

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

  protected getEcsTaskDefinitionConfig(
    containers: Container[],
    volumes: VolumeComponents,
  ): ecs.EcsTaskDefinitionConfig {
    return {
      ...super.getEcsTaskDefinitionConfig(containers, volumes),
      taskRoleArn: this.getLogstashTaskRole().artifacts.role.arn,
    };
  }

  /**
   * Create component once
   */
  protected getLogstashTaskRole(): LogstashTaskRoleComponent {
    if (!this.taskRoleArn) {
      this.taskRoleArn = new LogstashTaskRoleComponent(this, 'task-role', {});
    }
    return this.taskRoleArn;
  }

  protected getContainers(): Container[] {
    // Inject task role arn as environment variable
    const { containerConfig } = this.config;
    containerConfig.environments.ROLE_ARN =
      this.getLogstashTaskRole().artifacts.role.arn;

    return [
      new LogstashContainer(this, {
        ...containerConfig,
        name: 'logstash',
      }),
    ];
  }
}
