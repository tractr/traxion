import { ConstructOptions } from 'constructs';

import { DockerApplications } from '@tractr/terraform-registry-group';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-reverse-proxy-service';

export interface EcsComponentInternalConfig extends ConstructOptions {
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
