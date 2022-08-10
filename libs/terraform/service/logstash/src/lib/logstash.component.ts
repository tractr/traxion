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
      taskRoleArn: this.createLogstashTaskRole().artifacts.role.arn,
    };
  }

  protected createLogstashTaskRole(): LogstashTaskRoleComponent {
    return new LogstashTaskRoleComponent(this, 'task-role', {});
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
