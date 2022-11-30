import { s3 } from '@cdktf/provider-aws';
import { DeepPartial } from 'ts-essentials';

import { EcsComponent } from '../ecs.component';

import { EntrypointComponent } from '@trxn/terraform-component-entrypoint';
import { FileStorageComponent } from '@trxn/terraform-component-file-storage';
import { LogsComponent } from '@trxn/terraform-component-logs';
import { SecretsComponent } from '@trxn/terraform-component-secrets';
import type { NetworkGroup } from '@trxn/terraform-group-network';
import type { RegistryGroup } from '@trxn/terraform-group-registry';
import type { ZoneGroup } from '@trxn/terraform-group-zone';
import { ReverseProxyComponentPublicConfig } from '@trxn/terraform-service-reverse-proxy';

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
