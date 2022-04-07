import { vpc } from '@cdktf/provider-aws';

import { PublicComponentArtifacts, PublicComponentConfig } from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component provides a public subnet in a specific availability zone
 * A subnet is deemed to be a Public Subnet if it has a Route Table that directs traffic to the Internet Gateway.
 */
export class PublicComponent extends AwsComponent<
  PublicComponentConfig,
  PublicComponentArtifacts
> {
  protected createComponents(): void {
    const subnet = this.createSubnet();
    // Populate the artifacts
    this.artifacts = {
      subnetId: subnet.id,
    };
  }

  protected createSubnet() {
    return new vpc.Subnet(this, 'subnet', {
      availabilityZone: this.config.availabilityZone,
      vpcId: this.config.vpcId,
      cidrBlock: this.config.cidrBlock,
      ipv6CidrBlock: this.config.ipv6CidrBlock,
      mapPublicIpOnLaunch: true,
      assignIpv6AddressOnCreation: true,
      tags: this.getResourceNameAsTag('subnet'),
    });
  }
}
