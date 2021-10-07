import { SecurityGroupConfig } from '@cdktf/provider-aws';

import {
  ServiceComponentDefaultConfig,
  ServiceComponentInternalConfig,
  ServiceComponentPublicConfig,
} from '../interfaces';
import { ServiceComponent } from './service.component';

export interface BackendServiceComponentInternalConfig
  extends ServiceComponentInternalConfig {
  clientsSecurityGroupsIds: string[];
}

export type BackendServiceComponentConfig =
  BackendServiceComponentInternalConfig & ServiceComponentPublicConfig;
/**
 * This service is meant to be used by another one, as its backend
 * For example, Postgres which is used by the API
 */
export abstract class BackendServiceComponent<
  C extends BackendServiceComponentConfig = BackendServiceComponentConfig,
  D extends ServiceComponentDefaultConfig = ServiceComponentDefaultConfig,
> extends ServiceComponent<C, D> {
  protected getSecurityGroupConfig(): SecurityGroupConfig {
    return {
      ...super.getSecurityGroupConfig(),
      ingress: this.getIngressPorts().map((port) => ({
        protocol: 'tcp',
        fromPort: port,
        toPort: port,
        securityGroups: this.config.clientsSecurityGroupsIds,
      })),
    };
  }

  protected abstract getIngressPorts(): number[];
}
