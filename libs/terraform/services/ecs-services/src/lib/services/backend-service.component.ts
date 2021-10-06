import { SecurityGroupConfig } from '@cdktf/provider-aws';

import {
  ServiceComponent,
  ServiceComponentPrivateConfig,
  ServiceComponentPublicConfig,
} from './service.component';

export interface BackendServiceComponentPrivateConfig
  extends ServiceComponentPrivateConfig {
  clientsSecurityGroupsIds: string[];
}

export type BackendServiceComponentConfig =
  BackendServiceComponentPrivateConfig & ServiceComponentPublicConfig;
/**
 * This service is meant to be used by another one, as its backend
 * For example, Postgres which is used by the API
 */
export abstract class BackendServiceComponent<
  T extends BackendServiceComponentConfig = BackendServiceComponentConfig,
> extends ServiceComponent<T> {
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
