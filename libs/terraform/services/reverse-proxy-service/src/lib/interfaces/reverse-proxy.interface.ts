import {
  ContainerInternalConfig,
  HttpContainerPublicConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentInternalConfig,
} from '@tractr/terraform-ecs-services';
import { DeepPartial } from 'ts-essentials';

export interface ReverseProxyContainerPublicConfig
  extends HttpContainerPublicConfig {
  clusterName: string;
}
export type ReverseProxyContainerConfig = ContainerInternalConfig &
  ReverseProxyContainerPublicConfig;

export interface ReverseProxyComponentInternalConfig
  extends ServiceComponentInternalConfig {
  loadBalancerSecurityGroupId: string;
  loadBalancerTargetGroupArn: string;
}

export interface ReverseProxyComponentDefaultConfig
  extends ServiceComponentDefaultConfig {
  containerConfig: ReverseProxyContainerPublicConfig;
}
export type ReverseProxyComponentPublicConfig =
  DeepPartial<ReverseProxyComponentDefaultConfig>;
export type ReverseProxyComponentConfig = ReverseProxyComponentInternalConfig &
  ReverseProxyComponentPublicConfig;
