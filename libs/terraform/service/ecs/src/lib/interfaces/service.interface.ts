import {
  cloudwatch,
  ecs,
  iam,
  s3,
  secretsmanager,
  servicediscovery,
  vpc,
} from '@cdktf/provider-aws';

import { Container } from '../containers';

import { DeploymentComponent } from '@tractr/terraform-component-deployment';
import { VolumeComponent } from '@tractr/terraform-component-volume';
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

export type VolumeConfig = {
  preventDestroy: boolean;
  enableBackups: boolean;
  containers: Container[];
};
export type VolumeConfigs = Record<string, VolumeConfig>;
export type VolumeComponents = Record<string, VolumeComponent>;

export interface ServiceComponentInternalConfig {
  vpc: vpc.Vpc;
  subnets: vpc.Subnet[];
  logsGroup: cloudwatch.CloudwatchLogGroup;
  cluster: ecs.EcsCluster;
  dockerApplications: DockerApplications;
  applicationBaseUrl: string;
  executionRole: iam.IamRole;
  secret: secretsmanager.SecretsmanagerSecret;
  privateDnsNamespace: servicediscovery.ServiceDiscoveryPrivateDnsNamespace;
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

export interface ServiceComponentArtifacts {
  containers: Container[];
  volumes: Record<string, VolumeComponent>;
  deployment?: DeploymentComponent;
  ecsService: ecs.EcsService;
  discoveryService: servicediscovery.ServiceDiscoveryService;
  taskDefinition: ecs.EcsTaskDefinition;
  securityGroup: vpc.SecurityGroup;
}
