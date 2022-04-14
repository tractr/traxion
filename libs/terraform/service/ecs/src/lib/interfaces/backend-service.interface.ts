import {
  ServiceComponentInternalConfig,
  ServiceComponentPublicConfig,
} from './service.interface';

export interface BackendServiceComponentInternalConfig
  extends ServiceComponentInternalConfig {
  clientsSecurityGroupsIds: string[];
}

export type BackendServiceComponentConfig =
  BackendServiceComponentInternalConfig & ServiceComponentPublicConfig;
