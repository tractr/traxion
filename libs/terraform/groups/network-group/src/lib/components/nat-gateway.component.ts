import { Eip, NatGateway, Route } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface NatGatewayComponentConfig extends ConstructOptions {
  routeTableId: string;
  publicSubnetId: string;
}

/**
 * This component provides a nat gateway, installed in the public subnet, to make internet available in the private subnet:
 * https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6
 *
 * There is one NAT Gateway for each availability zone
 */
export class NatGatewayComponent extends AwsComponent<NatGatewayComponentConfig> {
  protected readonly eip: Eip;

  protected readonly natGateway: NatGateway;

  protected readonly routeToNatGateway: Route;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: NatGatewayComponentConfig,
  ) {
    super(scope, id, config);

    this.eip = this.createEip();
    this.natGateway = this.createNatGateway();
    this.routeToNatGateway = this.createRouteToNatGateway();
  }

  protected createEip() {
    return new Eip(this, 'ip', {
      provider: this.provider,
      vpc: true,
      tags: this.getResourceNameAsTag('ip'),
    });
  }

  /**
   * Create a NAT gateway with an Elastic IP for each private subnet to get internet connectivity
   */
  protected createNatGateway() {
    return new NatGateway(this, 'gw', {
      provider: this.provider,
      subnetId: this.config.publicSubnetId,
      allocationId: this.getEipIdAsToken(),
      tags: this.getResourceNameAsTag('gw'),
    });
  }

  /**
   * Route non-local traffic through the NAT gateway to the internet
   */
  protected createRouteToNatGateway() {
    return new Route(this, 'rt', {
      provider: this.provider,
      destinationCidrBlock: '0.0.0.0/0',
      destinationIpv6CidrBlock: '::/0',
      natGatewayId: this.getNatGatewayIdAsToken(),
      routeTableId: this.config.routeTableId,
    });
  }

  getNatGatewayIdAsToken(): string {
    return Token.asString(this.natGateway.id);
  }

  getEipIdAsToken(): string {
    return Token.asString(this.eip.id);
  }
}
