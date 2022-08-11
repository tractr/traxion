import { cloudwatch, ecs, elb, secretsmanager, vpc } from '@cdktf/provider-aws';

import { PrivateDnsComponent } from '@tractr/terraform-component-private-dns';
import { DockerApplications } from '@tractr/terraform-group-registry';
import { ExecutionRoleComponent } from '@tractr/terraform-service-ecs';
import {
  ReverseProxyComponent,
  ReverseProxyComponentPublicConfig,
} from '@tractr/terraform-service-reverse-proxy';

export interface EcsComponentInternalConfig {
  subnets: vpc.Subnet[];
  loadBalancerSecurityGroup: vpc.SecurityGroup;
  loadBalancerTargetGroup: elb.AlbTargetGroup;
  secret: secretsmanager.SecretsmanagerSecret;
  logsGroup: cloudwatch.CloudwatchLogGroup;
  vpc: vpc.Vpc;
  dockerApplications: DockerApplications;
  applicationBaseUrl: string;
}

export interface EcsComponentPublicConfig {
  reverseProxyConfig: ReverseProxyComponentPublicConfig;
}

export type EcsComponentConfig = EcsComponentInternalConfig &
  EcsComponentPublicConfig;

export interface EcsComponentArtifacts {
  ecsCluster: ecs.EcsCluster;
  executionRole: ExecutionRoleComponent;
  privateDns: PrivateDnsComponent;
  reverseProxy: ReverseProxyComponent;
}
