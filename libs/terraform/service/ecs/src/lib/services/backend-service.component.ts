import { vpc } from '@cdktf/provider-aws';

import { ServiceComponent } from './service.component';
import {
  BackendServiceComponentConfig,
  ServiceComponentArtifacts,
  ServiceComponentDefaultConfig,
} from '../interfaces';

/**
 * This service is meant to be used by another one, as its backend
 * For example, Postgres which is used by the API
 */
export abstract class BackendServiceComponent<
  Config extends BackendServiceComponentConfig = BackendServiceComponentConfig,
  DefaultConfig extends ServiceComponentDefaultConfig = ServiceComponentDefaultConfig,
  Artifacts extends ServiceComponentArtifacts = ServiceComponentArtifacts,
> extends ServiceComponent<Config, DefaultConfig, Artifacts> {
  protected getSecurityGroupConfig(): vpc.SecurityGroupConfig {
    return {
      ...super.getSecurityGroupConfig(),
      ingress: this.getIngressPorts().map((port) => ({
        protocol: 'tcp',
        fromPort: port,
        toPort: port,
        securityGroups: this.config.clientsSecurityGroups.map((sg) => sg.id),
        selfAttribute: this.shouldAccessItself(),
      })),
    };
  }

  /**
   * Whether to add `self` attribute on security group ingress rules in order to allow this service to call itself.
   * For example, a service with two different containers that need to call each other.
   */
  protected shouldAccessItself(): boolean {
    return false;
  }

  protected abstract getIngressPorts(): number[];
}
