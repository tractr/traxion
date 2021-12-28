import { servicediscovery } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface PrivateDnsComponentConfig {
  vpcId: string;
}

export class PrivateDnsComponent extends AwsComponent<PrivateDnsComponentConfig> {
  protected readonly serviceDiscoveryPrivateDnsNamespace: servicediscovery.ServiceDiscoveryPrivateDnsNamespace;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PrivateDnsComponentConfig,
  ) {
    super(scope, id, config);

    this.serviceDiscoveryPrivateDnsNamespace =
      this.createServiceDiscoveryPrivateDnsNamespace();
  }

  protected createServiceDiscoveryPrivateDnsNamespace() {
    return new servicediscovery.ServiceDiscoveryPrivateDnsNamespace(
      this,
      'namespace',
      {
        name: this.getResourceNameAsDomainName('local'),
        vpc: this.config.vpcId,
      },
    );
  }

  protected getResourceNameAsDomainName(name: string): string {
    return this.getResourceName(name).replace(/_/g, '');
  }

  getNamespaceIdAsToken(): string {
    return Token.asString(this.serviceDiscoveryPrivateDnsNamespace.id);
  }

  getNamespaceNameAsToken(): string {
    return Token.asString(this.serviceDiscoveryPrivateDnsNamespace.name);
  }
}
