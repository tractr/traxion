import { datasources, vpc } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import { InternetRoutesComponent } from './internet-routes.component';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface BaseComponentConfig {
  cidrPrefix: string;
  zones: string[];
}

/**
 * This component creates the base resources for the network: VPC, Internet Gateways
 */
export class BaseComponent extends AwsComponent<BaseComponentConfig> {
  protected readonly availabilityZones: datasources.DataAwsAvailabilityZone[];

  protected readonly vpc: vpc.Vpc;

  protected readonly vpcData: vpc.DataAwsVpc;

  protected readonly internetGateway: vpc.InternetGateway;

  protected readonly egressOnlyInternetGateway: vpc.EgressOnlyInternetGateway;

  protected readonly internetRoutesComponent: InternetRoutesComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: BaseComponentConfig,
  ) {
    super(scope, id, config);

    this.vpc = this.createVpc();
    this.vpcData = this.getVpcData();
    this.availabilityZones = this.getAvailabilityZones();
    this.internetGateway = this.createInternetGateway();
    this.egressOnlyInternetGateway = this.createEgressOnlyInternetGateway();
    this.internetRoutesComponent = this.createInternetRoutesComponent();
  }

  protected getAvailabilityZones() {
    return this.config.zones.map((availabilityZoneLetter) =>
      this.getAvailabilityZone(availabilityZoneLetter),
    );
  }

  protected getAvailabilityZone(availabilityZoneLetter: string) {
    return new datasources.DataAwsAvailabilityZone(
      this,
      `az-${availabilityZoneLetter}`,
      {
        provider: this.provider,
        state: 'available',
        name: this.getZoneName(availabilityZoneLetter),
      },
    );
  }

  protected createVpc() {
    return new vpc.Vpc(this, 'vpc', {
      provider: this.provider,
      cidrBlock: `${this.config.cidrPrefix}.0.0/16`,
      assignGeneratedIpv6CidrBlock: true,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: this.getResourceNameAsTag('vpc'),
    });
  }

  protected getVpcData() {
    return new vpc.DataAwsVpc(this, 'vpc-data', {
      cidrBlock: `${this.config.cidrPrefix}.0.0/16`,
      dependsOn: [this.vpc],
    });
  }

  protected createInternetGateway() {
    return new vpc.InternetGateway(this, 'igw', {
      provider: this.provider,
      vpcId: this.getVpcIdAsToken(),
      tags: this.getResourceNameAsTag('igw'),
    });
  }

  protected createEgressOnlyInternetGateway() {
    return new vpc.EgressOnlyInternetGateway(this, 'egw', {
      provider: this.provider,
      vpcId: this.getVpcIdAsToken(),
      tags: this.getResourceNameAsTag('egw'),
    });
  }

  protected createInternetRoutesComponent() {
    return new InternetRoutesComponent(this, 'internet', {
      internetGatewayId: this.getInternetGatewayIdAsToken(),
      routeTableId: this.getVpcMainRouteTableIdAsToken(),
    });
  }

  getInternetGateway(): vpc.InternetGateway {
    return this.internetGateway;
  }

  getVpcIdAsToken(): string {
    return Token.asString(this.vpc.id);
  }

  getVpcMainRouteTableIdAsToken(): string {
    return Token.asString(this.vpc.mainRouteTableId);
  }

  getInternetGatewayIdAsToken(): string {
    return Token.asString(this.internetGateway.id);
  }

  getEgressOnlyInternetGatewayGatewayIdAsToken(): string {
    return Token.asString(this.egressOnlyInternetGateway.id);
  }

  protected getSubnetCidr(
    cidrBlock: string,
    newbits: number,
    netnum: number,
  ): string {
    return cidrBlock.replace(
      /\${([a-z0-9-_.[\]]+)}/i,
      (substring, token: string) =>
        `\${cidrsubnet("\${${token}}", ${newbits}, ${netnum})}`,
    );
  }

  getVpcCidrBlock(): string {
    return Token.asString(this.vpcData.cidrBlock);
  }

  getPrivateCidrBlockForIndex(index: number | undefined): string {
    const subnetIndex = index || 0;
    return this.getSubnetCidr(this.getVpcCidrBlock(), 8, subnetIndex);
  }

  getPublicCidrBlockForIndex(index: number | undefined): string {
    const subnetIndex = (index || 0) + 128;
    return this.getSubnetCidr(this.getVpcCidrBlock(), 8, subnetIndex);
  }

  getIpv6CidrBlock(): string {
    return Token.asString(this.vpcData.ipv6CidrBlock);
  }

  getPrivateIpv6CidrBlockForIndex(index: number | undefined): string {
    const subnetIndex = index || 0;
    return this.getSubnetCidr(this.getIpv6CidrBlock(), 8, subnetIndex);
  }

  getPublicIpv6CidrBlockForIndex(index: number | undefined): string {
    const subnetIndex = (index || 0) + 128;
    return this.getSubnetCidr(this.getIpv6CidrBlock(), 8, subnetIndex);
  }

  getZoneName(availabilityZoneLetter: string): string {
    return `${this.provider.region}${availabilityZoneLetter}`;
  }
}
