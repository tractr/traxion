import { ecs, servicediscovery, vpc } from '@cdktf/provider-aws';

import { REVERSE_PROXY_COMPONENT_DEFAULT_CONFIG } from './configs';
import {
  ReverseProxyComponentConfig,
  ReverseProxyComponentDefaultConfig,
} from './interfaces';
import { ReverseProxyContainer } from './reverse-proxy.container';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';
import {
  Container,
  ServiceComponent,
  VolumeComponents,
} from '@tractr/terraform-service-ecs';

export class ReverseProxyComponent extends ServiceComponent<
  ReverseProxyComponentConfig,
  ReverseProxyComponentDefaultConfig
> {
  /**
   * Override constructor to merge config with default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ReverseProxyComponentConfig,
  ) {
    super(scope, id, config, REVERSE_PROXY_COMPONENT_DEFAULT_CONFIG);
  }

  protected getSecurityGroupConfig(): vpc.SecurityGroupConfig {
    return {
      ...super.getSecurityGroupConfig(),
      ingress: [
        {
          protocol: 'tcp',
          fromPort: 80,
          toPort: 80,
          securityGroups: [this.config.loadBalancerSecurityGroupId],
        },
        {
          protocol: 'tcp',
          fromPort: 8080,
          toPort: 8080,
          selfAttribute: true,
          securityGroups: [this.config.loadBalancerSecurityGroupId],
        },
      ],
    };
  }

  protected getEcsTaskDefinitionConfig(
    containers: Container[],
    volumes: VolumeComponents,
  ): ecs.EcsTaskDefinitionConfig {
    return {
      ...super.getEcsTaskDefinitionConfig(containers, volumes),
      taskRoleArn: this.config.taskRoleArn,
    };
  }

  protected getEcsServiceConfig(
    securityGroup: vpc.SecurityGroup,
    taskDefinition: ecs.EcsTaskDefinition,
    discoveryService: servicediscovery.ServiceDiscoveryService,
  ): ecs.EcsServiceConfig {
    return {
      ...super.getEcsServiceConfig(
        securityGroup,
        taskDefinition,
        discoveryService,
      ),
      loadBalancer: [
        {
          targetGroupArn: this.config.loadBalancerTargetGroupArn,
          containerName: 'reverse-proxy',
          containerPort: 80,
        },
      ],
    };
  }

  protected getContainers(): Container[] {
    return [
      new ReverseProxyContainer(this, {
        ...this.config.containerConfig,
        clusterName: this.config.clusterName,
        name: 'reverse-proxy',
      }),
    ];
  }
}
