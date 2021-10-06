import { ConstructOptions } from 'constructs';

import { ServiceComponentPublicConfig } from '../../../../../services/ecs-services/src/lib/services';

import type { NetworkGroup } from '@tractr/terraform-network-group';
import type { RegistryGroup } from '@tractr/terraform-registry-group';
import type { ZoneGroup } from '@tractr/terraform-zone-group';

export interface PoolGroupInternalConfig extends ConstructOptions {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
}

export interface PoolGroupPublicConfig extends ConstructOptions {
  subDomain: string;
  reverseProxy: ServiceComponentPublicConfig;
}

export type PoolGroupConfig = PoolGroupInternalConfig & PoolGroupPublicConfig;
