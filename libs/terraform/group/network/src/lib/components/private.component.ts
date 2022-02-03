import { vpc } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import { EgressRoutesComponent } from './egress-routes.component';
import { InternetRoutesComponent } from './internet-routes.component';
import { NatGatewayComponent } from './nat-gateway.component';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export type InternetAccessMode = 'nat' | 'egress' | 'igw' | 'none';

export interface PrivateComponentConfig {
  vpcId: string;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
  /** Enable internet access through NAT Gateway or Egress */
  internetAccessMode: InternetAccessMode;
  publicSubnetId?: string;
  egressOnlyInternetGatewayId?: string;
  internetGatewayId?: string;
}

/**
 * This component creates a private subnet in a specific availability zone
 * A private subnet access internet through a NAT Gateway rather than an Internet Gateway
 * https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6
 */
export class PrivateComponent extends AwsComponent<PrivateComponentConfig> {
  protected readonly subnet: vpc.Subnet;

  protected readonly routeTable: vpc.RouteTable;

  protected readonly routeTableAssociation: vpc.RouteTableAssociation;

  protected readonly natGatewayComponent: NatGatewayComponent | undefined;

  protected readonly egressRoutesComponent: EgressRoutesComponent | undefined;

  protected readonly internetRoutesComponent:
    | InternetRoutesComponent
    | undefined;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PrivateComponentConfig,
  ) {
    super(scope, id, config);

    this.subnet = this.createSubnet();
    this.routeTable = this.createRouteTable();
    this.routeTableAssociation = this.createRouteTableAssociation();

    if (this.config.internetAccessMode === 'nat') {
      this.natGatewayComponent = this.createNatGatewayComponent();
    } else if (this.config.internetAccessMode === 'egress') {
      this.egressRoutesComponent = this.createEgressRoutesComponent();
    } else if (this.config.internetAccessMode === 'igw') {
      this.internetRoutesComponent = this.createInternetRoutesComponent();
    }
  }

  protected createSubnet() {
    return new vpc.Subnet(this, 'subnet', {
      provider: this.provider,
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
   */
  protected createRouteTable() {
    return new vpc.RouteTable(this, 'rt', {
      provider: this.provider,
      vpcId: this.config.vpcId,
      tags: this.getResourceNameAsTag('rt'),
    });
  }

  /**
   * Explicitly associate the newly created route tables to the private subnets (so they don't default to the main route table)
   */
  protected createRouteTableAssociation() {
    return new vpc.RouteTableAssociation(this, 'rt-assoc', {
      provider: this.provider,
      routeTableId: this.getRouteTableIdAsToken(),
      subnetId: this.getSubnetIdAsToken(),
    });
  }

  protected createNatGatewayComponent() {
    if (!this.config.publicSubnetId) {
      throw new Error(
        'publicSubnetId is required to create NatGatewayComponent',
      );
    }
    return new NatGatewayComponent(this, 'nat', {
      publicSubnetId: this.config.publicSubnetId,
      routeTableId: this.getRouteTableIdAsToken(),
    });
  }

  protected createEgressRoutesComponent() {
    if (!this.config.egressOnlyInternetGatewayId) {
      throw new Error(
        'egressOnlyInternetGatewayId is required to create EgressRoutesComponent',
      );
    }
    return new EgressRoutesComponent(this, 'egress', {
      egressOnlyInternetGatewayId: this.config.egressOnlyInternetGatewayId,
      routeTableId: this.getRouteTableIdAsToken(),
    });
  }

  protected createInternetRoutesComponent() {
    if (!this.config.internetGatewayId) {
      throw new Error(
        'internetGatewayId is required to create InternetRoutesComponent',
      );
    }
    return new InternetRoutesComponent(this, 'internet', {
      internetGatewayId: this.config.internetGatewayId,
      routeTableId: this.getRouteTableIdAsToken(),
    });
  }

  getRouteTableIdAsToken(): string {
    return Token.asString(this.routeTable.id);
  }

  getSubnetIdAsToken(): string {
    return Token.asString(this.subnet.id);
  }
}
