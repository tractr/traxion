import { Container } from '../containers';

import { DockerApplications } from '@tractr/terraform-group-registry';

// Check cpu/memory pairs: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
export type CpuValue = '256' | '512' | '1024' | '2048' | '4096';
export type MemoryValue =
  | '512'
  | '1024'
  | '2048'
  | '3072'
  | '4096'
  | '5120'
  | '6144'
  | '7168'
  | '8192'
  | '16384'
  | '30720';

export type VolumesConfig = {
  preventDestroy: boolean;
  enableBackups: boolean;
  containers: Container[];
};
export type VolumesConfigs = Record<string, VolumesConfig>;

export interface ServiceComponentInternalConfig {
  vpcId: string;
  subnetsIds: string[];
  logsGroup: string;
  clusterId: string;
  clusterName: string;
  dockerApplications: DockerApplications;
  applicationBaseUrl: string;
  executionRoleArn: string;
  secretsmanagerSecretArn: string;
  fileStorageS3Endpoint: string;
  fileStorageS3BucketName: string;
  privateDnsNamespaceId: string;
  privateDnsNamespaceName: string;
}

export interface ServiceComponentDefaultConfig {
  cpu: CpuValue;
  memory: MemoryValue;
  desiredCount: number;
}

export type ServiceComponentPublicConfig =
  Partial<ServiceComponentDefaultConfig>;

export type ServiceComponentConfig = ServiceComponentInternalConfig &
  ServiceComponentPublicConfig;
