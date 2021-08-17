import { ConstructOptions } from 'constructs';

import type { NetworkGroup } from '@tractr/terraform-network-group';
import { RegistryGroup } from '@tractr/terraform-registry-group';
import type { ZoneGroup } from '@tractr/terraform-zone-group';

export interface PoolGroupConfig extends PoolGroupPublicConfig {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
  subDomain: string;
  reverseProxyDesiredCount: number;
}

export interface PoolGroupPublicConfig extends ConstructOptions {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
  subDomain?: string;
  reverseProxyDesiredCount?: number;
}
