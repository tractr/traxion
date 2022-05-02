import { vpc } from '@cdktf/provider-aws';

import {
  ServiceComponentInternalConfig,
  ServiceComponentPublicConfig,
} from './service.interface';

export interface BackendServiceComponentInternalConfig
  extends ServiceComponentInternalConfig {
  clientsSecurityGroups: vpc.SecurityGroup[];
}

export type BackendServiceComponentConfig =
  BackendServiceComponentInternalConfig & ServiceComponentPublicConfig;
