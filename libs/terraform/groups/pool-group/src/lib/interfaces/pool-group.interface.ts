import { ConstructOptions } from 'constructs';

import type { NetworkGroup } from '@tractr/terraform-network-group';
import type { RegistryGroup } from '@tractr/terraform-registry-group';
import type { ZoneGroup } from '@tractr/terraform-zone-group';
import { ReverseProxyComponentPublicConfig } from '@tractr/terraform-reverse-proxy-service';
import { DeepPartial } from 'ts-essentials';

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
