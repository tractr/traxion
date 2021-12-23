import { vpc } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface PublicComponentConfig {
  vpcId: string;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
}

/**
 * This component provides a public subnet in a specific availability zone
 * A subnet is deemed to be a Public Subnet if it has a Route Table that directs traffic to the Internet Gateway.
 */
export class PublicComponent extends AwsComponent<PublicComponentConfig> {
  protected readonly subnet: vpc.Subnet;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PublicComponentConfig,
  ) {
    super(scope, id, config);
    this.subnet = this.createSubnet();
  }

  protected createSubnet() {
    return new vpc.Subnet(this, 'subnet', {
      provider: this.provider,
      availabilityZone: this.config.availabilityZone,
      vpcId: this.config.vpcId,
      cidrBlock: this.config.cidrBlock,
      ipv6CidrBlock: this.config.ipv6CidrBlock,
      mapPublicIpOnLaunch: true,
      assignIpv6AddressOnCreation: true,
      tags: this.getResourceNameAsTag('subnet'),
    });
  }

  getSubnetIdAsToken(): string {
    return Token.asString(this.subnet.id);
  }
}
