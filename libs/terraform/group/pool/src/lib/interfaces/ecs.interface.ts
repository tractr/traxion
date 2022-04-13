import { ecs } from '@cdktf/provider-aws';

import { PrivateDnsComponent } from '@tractr/terraform-component-private-dns';
import { DockerApplications } from '@tractr/terraform-group-registry';
import { ExecutionRoleComponent } from '@tractr/terraform-service-ecs';
import {
  ReverseProxyComponent,
  ReverseProxyComponentPublicConfig,
  ReverseProxyTaskRoleComponent,
} from '@tractr/terraform-service-reverse-proxy';

export interface EcsComponentInternalConfig {
  subnetsIds: string[];
  loadBalancerSecurityGroupId: string;
  loadBalancerTargetGroupArn: string;
  secretsmanagerSecretArn: string;
  fileStorageS3Endpoint: string;
  fileStorageS3BucketName: string;
  logsGroup: string;
  vpcId: string;
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
  reverseProxyTaskRole: ReverseProxyTaskRoleComponent;
}
