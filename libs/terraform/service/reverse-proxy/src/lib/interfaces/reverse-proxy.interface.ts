import { ecs, elb, vpc } from '@cdktf/provider-aws';
import { DeepPartial } from 'ts-essentials';

import {
  ContainerInternalConfig,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentInternalConfig,
} from '@trxn/terraform-service-ecs';

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
}

export interface ReverseProxyComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: ReverseProxyContainerPublicConfig;
}
export type ReverseProxyComponentPublicConfig =
  DeepPartial<ReverseProxyComponentDefaultConfig>;
export type ReverseProxyComponentConfig = ReverseProxyComponentInternalConfig &
  ReverseProxyComponentPublicConfig;
