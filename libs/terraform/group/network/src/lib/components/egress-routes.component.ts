import { vpc } from '@cdktf/provider-aws';

import {
  EgressRoutesComponentArtifacts,
  EgressRoutesComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component provides an Egress Only Internet Gateway to make internet available in the private subnet with IPv6.
 * https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
 *
 * The EgressOnlyInternetGateway is defined at the VPC level, as for the InternetGateway
 */
export class EgressRoutesComponent extends AwsComponent<
  EgressRoutesComponentConfig,
  EgressRoutesComponentArtifacts
> {
  protected createComponents(): void {
    this.createIpv6RouteToEgressOnlyInternetGateway();
    // Populate the artifacts
    this.artifacts = {};
  }

  /**
   * Route non-local traffic through the egress gateway to the internet
   */
  protected createIpv6RouteToEgressOnlyInternetGateway() {
    return new vpc.Route(this, 'rt6', {
      destinationIpv6CidrBlock: '::/0',
      egressOnlyGatewayId: this.config.egressOnlyInternetGatewayId,
      routeTableId: this.config.routeTableId,
    });
  }
}
