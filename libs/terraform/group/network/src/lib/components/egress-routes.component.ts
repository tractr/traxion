import { Route } from '@cdktf/provider-aws';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface EgressRoutesComponentConfig extends ConstructOptions {
  routeTableId: string;
  egressOnlyInternetGatewayId: string;
}

/**
 * This component provides an Egress Only Internet Gateway to make internet available in the private subnet with IPv6.
 * https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
 *
 * The EgressOnlyInternetGateway is defined at the VPC level, as for the InternetGateway
 */
export class EgressRoutesComponent extends AwsComponent<EgressRoutesComponentConfig> {
  protected readonly ipv6RouteToEgressOnlyInternetGateway: Route;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: EgressRoutesComponentConfig,
  ) {
    super(scope, id, config);

    this.ipv6RouteToEgressOnlyInternetGateway =
      this.createIpv6RouteToEgressOnlyInternetGateway();
  }

  /**
   * Route non-local traffic through the egress gateway to the internet
   */
  protected createIpv6RouteToEgressOnlyInternetGateway() {
    return new Route(this, 'rt6', {
      provider: this.provider,
      destinationIpv6CidrBlock: '::/0',
      egressOnlyGatewayId: this.config.egressOnlyInternetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }
}
