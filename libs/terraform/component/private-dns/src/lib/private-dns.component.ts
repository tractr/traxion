import { servicediscovery } from '@cdktf/provider-aws';

import {
  PrivateDnsComponentArtifacts,
  PrivateDnsComponentConfig,
} from './private-dns.interface';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class PrivateDnsComponent extends AwsComponent<
  PrivateDnsComponentConfig,
  PrivateDnsComponentArtifacts
> {
  protected createComponents(): void {
    const dnsNamespace =
      new servicediscovery.ServiceDiscoveryPrivateDnsNamespace(
        this,
        'namespace',
        {
          name: this.getResourceNameAsDomainName('local'),
          vpc: this.config.vpc.id,
        },
      );

    // Populate the artifacts
    this.artifacts = { dnsNamespace };
  }

  protected getResourceNameAsDomainName(name: string): string {
    return this.getResourceName(name).replace(/_/g, '');
  }
}
