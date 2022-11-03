import { s3 } from '@cdktf/provider-aws';
import { DeepPartial } from 'ts-essentials';

import { EcsComponent } from '../ecs.component';

import { EntrypointComponent } from '@tractr/terraform-component-entrypoint';
import { FileStorageComponent } from '@tractr/terraform-component-file-storage';
import { LogsComponent } from '@tractr/terraform-component-logs';
import { SecretsComponent } from '@tractr/terraform-component-secrets';
import type { NetworkGroup } from '@tractr/terraform-group-network';
import type { RegistryGroup } from '@tractr/terraform-group-registry';
import type { ZoneGroup } from '@tractr/terraform-group-zone';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-service-reverse-proxy';

export interface PoolGroupInternalConfig {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
}

export interface PoolGroupDefaultConfig {
  reverseProxyConfig: ReverseProxyComponentPublicConfig;
  fileStorageConfig: {
    additionalReadOnlyS3Buckets?: s3.S3Bucket[];
    s3PublicRead?: boolean;
    s3AllowUpload?: boolean;
  };
}
export type PoolGroupPublicConfig = DeepPartial<PoolGroupDefaultConfig> & {
  subDomain: string;
};

export type PoolGroupConfig = PoolGroupInternalConfig & PoolGroupPublicConfig;

export interface PoolGroupArtifacts {
  logs: LogsComponent;
  secrets: SecretsComponent;
  entrypoint: EntrypointComponent;
  fileStorage: FileStorageComponent;
  ecs: EcsComponent;
}
