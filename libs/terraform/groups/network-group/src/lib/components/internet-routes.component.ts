import { Route } from '@cdktf/provider-aws';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export interface InternetRoutesComponentConfig extends ConstructOptions {
  routeTableId: string;
  internetGatewayId: string;
}

/**
 * This component provides an EInternet Gateway to make internet available in the private subnet with IPv4 and IPv6.
 * The InternetGateway is defined at the VPC level, as for the EgressOnlyInternetGateway
 */
export class InternetRoutesComponent extends AwsComponent<InternetRoutesComponentConfig> {
  protected readonly routeToInternetGateway: Route;

  protected readonly ipv6RouteToInternetGateway: Route;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: InternetRoutesComponentConfig,
  ) {
    super(scope, id, config);

    this.routeToInternetGateway = this.createRouteToInternetGateway();
    this.ipv6RouteToInternetGateway = this.createIpv6RouteToInternetGateway();
  }

  protected createRouteToInternetGateway() {
    return new Route(this, 'rt', {
      provider: this.provider,
      destinationCidrBlock: '0.0.0.0/0',
      gatewayId: this.config.internetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }

  protected createIpv6RouteToInternetGateway() {
    return new Route(this, 'rt6', {
      provider: this.provider,
      destinationIpv6CidrBlock: '::/0',
      gatewayId: this.config.internetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }
}
