import { vpc } from '@cdktf/provider-aws';

import {
  EgressGatewayComponentArtifacts,
  EgressGatewayComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

/**
 * This component provides an Egress Only Internet Gateway to make internet available in the private subnet with IPv6.
 * https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
 *
 * The EgressOnlyInternetGateway is defined at the VPC level, as for the InternetGateway
 */
export class EgressGatewayComponent extends AwsComponent<
  EgressGatewayComponentConfig,
  EgressGatewayComponentArtifacts
> {
  protected createComponents(): void {
    this.createRouteToEgressOnlyInternetGateway();
    // Populate the artifacts
    this.artifacts = {};
  }

  /**
   * Route non-local traffic through the egress gateway to the internet
   */
  protected createRouteToEgressOnlyInternetGateway() {
    return new vpc.Route(this, 'rt', {
      destinationIpv6CidrBlock: '::/0',
      egressOnlyGatewayId: this.config.egressOnlyInternetGateway.id,
      routeTableId: this.config.routeTable.id,
    });
  }
}
