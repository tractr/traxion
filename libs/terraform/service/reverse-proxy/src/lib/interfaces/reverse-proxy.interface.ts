import { ecs, elb, iam, vpc } from '@cdktf/provider-aws';
import { DeepPartial } from 'ts-essentials';

import {
  ContainerInternalConfig,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentInternalConfig,
} from '@tractr/terraform-service-ecs';

export type ReverseProxyContainerPublicConfig = HttpContainerPublicConfig;

export interface ReverseProxyContainerConfig
  extends ContainerInternalConfig,
    ReverseProxyContainerPublicConfig {
  cluster: ecs.EcsCluster;
}

export interface ReverseProxyComponentInternalConfig
  extends ServiceComponentInternalConfig {
  loadBalancerSecurityGroup: vpc.SecurityGroup;
  loadBalancerTargetGroup: elb.AlbTargetGroup;
  taskRole: iam.IamRole;
}

export interface ReverseProxyComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: ReverseProxyContainerPublicConfig;
}
export type ReverseProxyComponentPublicConfig =
  DeepPartial<ReverseProxyComponentDefaultConfig>;
export type ReverseProxyComponentConfig = ReverseProxyComponentInternalConfig &
  ReverseProxyComponentPublicConfig;
