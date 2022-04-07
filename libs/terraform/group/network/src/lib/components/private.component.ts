import { vpc } from '@cdktf/provider-aws';

import {
  PrivateComponentArtifacts,
  PrivateComponentConfig,
} from '../interfaces';
import { EgressRoutesComponent } from './egress-routes.component';
import { InternetRoutesComponent } from './internet-routes.component';
import { NatGatewayComponent } from './nat-gateway.component';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This component creates a private subnet in a specific availability zone
 * A private subnet access internet through a NAT Gateway rather than an Internet Gateway
 * https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6
 */
export class PrivateComponent extends AwsComponent<
  PrivateComponentConfig,
  PrivateComponentArtifacts
> {
  protected validateConfig() {
    if (
      this.config.internetAccessMode === 'nat' &&
      !this.config.publicSubnetId
    ) {
      throw new Error(
        'publicSubnetId is required to create NatGatewayComponent',
      );
    }
    if (
      this.config.internetAccessMode === 'egress' &&
      !this.config.egressOnlyInternetGatewayId
    ) {
      throw new Error(
        'egressOnlyInternetGatewayId is required to create EgressRoutesComponent',
      );
    }
    if (
      this.config.internetAccessMode === 'igw' &&
      !this.config.internetGatewayId
    ) {
      throw new Error(
        'internetGatewayId is required to create InternetRoutesComponent',
      );
    }
  }

  protected createComponents(): void {
    const subnet = this.createSubnet();
    const routeTable = this.createRouteTable(subnet);

    if (this.config.internetAccessMode === 'nat') {
      this.createNatGatewayComponent(routeTable);
    } else if (this.config.internetAccessMode === 'egress') {
      this.createEgressRoutesComponent(routeTable);
    } else if (this.config.internetAccessMode === 'igw') {
      this.createInternetRoutesComponent(routeTable);
    }

    // Populate the artifacts
    this.artifacts = {
      routeTableId: routeTable.id,
      subnetId: subnet.id,
    };
  }

  protected createSubnet() {
    return new vpc.Subnet(this, 'subnet', {
      availabilityZone: this.config.availabilityZone,
      vpcId: this.config.vpcId,
      cidrBlock: this.config.cidrBlock,
      ipv6CidrBlock: this.config.ipv6CidrBlock,
      mapPublicIpOnLaunch: false,
      assignIpv6AddressOnCreation: false,
      tags: this.getResourceNameAsTag('subnet'),
    });
  }

  /**
   * Create a new route table for the private subnets
   * Also associate the route table with the private subnet
   */
  protected createRouteTable(subnet: vpc.Subnet) {
    const routeTable = new vpc.RouteTable(this, 'rt', {
      vpcId: this.config.vpcId,
      tags: this.getResourceNameAsTag('rt'),
    });
    // Explicitly associate the newly created route tables to the private subnets
    // (so they don't default to the main route table)
    /* eslint-disable-next-line no-new */
    new vpc.RouteTableAssociation(this, 'rt-assoc', {
      routeTableId: routeTable.id,
      subnetId: subnet.id,
    });
    return routeTable;
  }

  protected createNatGatewayComponent(routeTable: vpc.RouteTable) {
    return new NatGatewayComponent(this, 'nat', {
      publicSubnetId: this.config.publicSubnetId as string, // Already validated
      routeTableId: routeTable.id,
    });
  }

  protected createEgressRoutesComponent(routeTable: vpc.RouteTable) {
    return new EgressRoutesComponent(this, 'egress', {
      egressOnlyInternetGatewayId: this.config
        .egressOnlyInternetGatewayId as string, // Already validated
      routeTableId: routeTable.id,
    });
  }

  protected createInternetRoutesComponent(routeTable: vpc.RouteTable) {
    return new InternetRoutesComponent(this, 'internet', {
      internetGatewayId: this.config.internetGatewayId as string, // Already validated
      routeTableId: routeTable.id,
    });
  }
}
