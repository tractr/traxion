import { vpc } from '@cdktf/provider-aws';

import {
  InternetRoutesComponentArtifacts,
  InternetRoutesComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component provides an Internet Gateway to make internet available in the private subnet with IPv4 and IPv6.
 * The InternetGateway is defined at the VPC level, as for the EgressOnlyInternetGateway
 */
export class InternetRoutesComponent extends AwsComponent<
  InternetRoutesComponentConfig,
  InternetRoutesComponentArtifacts
> {
  protected createComponents(): void {
    this.createRouteToInternetGateway();
    this.createIpv6RouteToInternetGateway();
    // Populate the artifacts
    this.artifacts = {};
  }

  protected createRouteToInternetGateway() {
    return new vpc.Route(this, 'rt', {
      destinationCidrBlock: '0.0.0.0/0',
      gatewayId: this.config.internetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }

  protected createIpv6RouteToInternetGateway() {
    return new vpc.Route(this, 'rt6', {
      destinationIpv6CidrBlock: '::/0',
      gatewayId: this.config.internetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }
}
