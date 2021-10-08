import { Route } from '@cdktf/provider-aws';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export interface EgressGatewayComponentConfig extends ConstructOptions {
  routeTableId: string;
  egressOnlyInternetGatewayId: string;
}

/**
 * This component provides an Egress Only Internet Gateway to make internet available in the private subnet with IPv6.
 * https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
 *
 * The EgressOnlyInternetGateway is defined at the VPC level, as for the InternetGateway
 */
export class EgressGatewayComponent extends AwsComponent<EgressGatewayComponentConfig> {
  protected readonly routeToEgressOnlyInternetGateway: Route;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: EgressGatewayComponentConfig,
  ) {
    super(scope, id, config);

    this.routeToEgressOnlyInternetGateway =
      this.createRouteToEgressOnlyInternetGateway();
  }

  /**
   * Route non-local traffic through the egress gateway to the internet
   */
  protected createRouteToEgressOnlyInternetGateway() {
    return new Route(this, 'rt', {
      provider: this.provider,
      destinationIpv6CidrBlock: '::/0',
      egressOnlyGatewayId: this.config.egressOnlyInternetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }
}
