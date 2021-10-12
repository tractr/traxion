import { ConstructOptions } from 'constructs';
import { DeepPartial } from 'ts-essentials';

import type { NetworkGroup } from '@tractr/terraform-group-network';
import type { RegistryGroup } from '@tractr/terraform-group-registry';
import type { ZoneGroup } from '@tractr/terraform-group-zone';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-service-reverse-proxy';

export interface PoolGroupInternalConfig extends ConstructOptions {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
}

export interface PoolGroupDefaultConfig {
  subDomain: string;
  reverseProxyConfig: ReverseProxyComponentPublicConfig;
}
export type PoolGroupPublicConfig = DeepPartial<PoolGroupDefaultConfig>;

export type PoolGroupConfig = PoolGroupInternalConfig & PoolGroupPublicConfig;
