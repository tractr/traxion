import { ecs, servicediscovery, vpc } from '@cdktf/provider-aws';

import {
  ReverseProxyComponentConfig,
  ReverseProxyComponentDefaultConfig,
} from './interfaces';
import { ReverseProxyContainer } from './reverse-proxy.container';

import {
  Container,
  ServiceComponent,
  VolumeComponents,
} from '@tractr/terraform-service-ecs';

export class ReverseProxyComponent extends ServiceComponent<
  ReverseProxyComponentConfig,
  ReverseProxyComponentDefaultConfig
> {
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
        name: 'reverse-proxy',
      }),
    ];
  }

  protected getDefaultConfig(): ReverseProxyComponentDefaultConfig {
    return {
      ...super.getDefaultConfig(),
      containerConfig: {
        imageTag: 'v2.4.8',
        clusterName: this.config.clusterName,
        // Those next lines enable access to Traefik dashboard and its basic auth
        // Traefik does not detect himself in ECS
        path: {
          prefix: `/reverse-proxy`,
          stripPrefix: true,
        },
        auth: {
          user: 'traefik',
          passwordHash:
            '$2y$05$x/uCqlUg9QM4fG/toYlN4u/Nri/JBrLpI3UKqTvTH7.PBL40j2F.G', // pass
        },
      },
    };
  }
}
