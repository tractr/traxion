import { ec2, vpc } from '@cdktf/provider-aws';

import {
  NatGatewayComponentArtifacts,
  NatGatewayComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component provides a nat gateway, installed in the public subnet, to make internet available in the private subnet:
 * https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6
 *
 * There is one NAT Gateway for each availability zone
 */
export class NatGatewayComponent extends AwsComponent<
  NatGatewayComponentConfig,
  NatGatewayComponentArtifacts
> {
  protected createComponents(): void {
    const eip = this.createEip();
    const natGateway = this.createNatGateway(eip);
    this.createRouteToNatGateway(natGateway);
    // Populate the artifacts
    this.artifacts = {
      natGatewayId: natGateway.id,
      eipId: eip.id,
    };
  }

  /**
   * Allocate an elastic IP address
   */
  protected createEip() {
    return new ec2.Eip(this, 'ip', {
      vpc: true,
      tags: this.getResourceNameAsTag('ip'),
    });
  }

  /**
   * Create a NAT gateway with an Elastic IP for each private subnet to get internet connectivity
   */
  protected createNatGateway(eip: ec2.Eip) {
    return new vpc.NatGateway(this, 'gw', {
      subnetId: this.config.publicSubnetId,
      allocationId: eip.id,
      tags: this.getResourceNameAsTag('gw'),
    });
  }

  /**
   * Route non-local traffic through the NAT gateway to the internet
   */
  protected createRouteToNatGateway(natGateway: vpc.NatGateway) {
    return new vpc.Route(this, 'rt', {
      destinationCidrBlock: '0.0.0.0/0',
      destinationIpv6CidrBlock: '::/0',
      natGatewayId: natGateway.id,
      routeTableId: this.config.routeTableId,
    });
  }
}
