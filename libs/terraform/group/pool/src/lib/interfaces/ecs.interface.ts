import { cloudwatch, ecs, elb, secretsmanager, vpc } from '@cdktf/provider-aws';

import { PrivateDnsComponent } from '@trxn/terraform-component-private-dns';
import { DockerApplications } from '@trxn/terraform-group-registry';
import { ExecutionRoleComponent } from '@trxn/terraform-service-ecs';
import {
  ReverseProxyComponent,
  ReverseProxyComponentPublicConfig,
} from '@trxn/terraform-service-reverse-proxy';

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
