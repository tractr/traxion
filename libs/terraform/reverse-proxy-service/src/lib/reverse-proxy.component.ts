import {
  EcsServiceConfig,
  EcsTaskDefinitionConfig,
  SecurityGroupConfig,
} from '@cdktf/provider-aws';

import { ReverseProxyTaskRoleComponent } from './reverse-proxy-task-role.component';
import { ReverseProxyContainer } from './reverse-proxy.container';

import { AwsProviderConstruct } from '@tractr/terraform-aws-component';
import {
  Container,
  ServiceComponent,
  ServiceComponentConfig,
} from '@tractr/terraform-ecs-services';

export interface ReverseProxyComponentConfig extends ServiceComponentConfig {
  loadBalancerSecurityGroupId: string;
  loadBalancerTargetGroupArn: string;
}

export class ReverseProxyComponent extends ServiceComponent<ReverseProxyComponentConfig> {
  protected readonly taskRoleComponent: ReverseProxyTaskRoleComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ReverseProxyComponentConfig,
  ) {
    super(scope, id, config);
    this.taskRoleComponent = this.createReverseProxyTaskRoleComponent();
  }

  protected createReverseProxyTaskRoleComponent() {
    return new ReverseProxyTaskRoleComponent(this, 'task');
  }

  protected getSecurityGroupConfig(): SecurityGroupConfig {
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

  protected getEcsTaskDefinitionConfig(): EcsTaskDefinitionConfig {
    return {
      ...super.getEcsTaskDefinitionConfig(),
      taskRoleArn: this.taskRoleComponent.getIamRoleArnAsToken(),
    };
  }

  protected getEcsServiceConfig(): EcsServiceConfig {
    return {
      ...super.getEcsServiceConfig(),
      loadBalancer: [
        {
          targetGroupArn: this.config.loadBalancerTargetGroupArn,
          containerName: 'proxy',
          containerPort: 80,
        },
      ],
    };
  }

  protected getContainers(): Container[] {
    return [
      new ReverseProxyContainer(this, {
        name: this.serviceName,
        // Those next lines enable access to Traefik dashboard and its basic auth
        // Traefik does not detect himself in ECS
        path: {
          prefix: `/${this.serviceName}`,
          stripPrefix: true,
        },
        auth: {
          user: 'traefik',
          passwordHash:
            '$2y$05$x/uCqlUg9QM4fG/toYlN4u/Nri/JBrLpI3UKqTvTH7.PBL40j2F.G', // pass
        },
        clusterName: this.config.clusterName,
      }),
    ];
  }
}
