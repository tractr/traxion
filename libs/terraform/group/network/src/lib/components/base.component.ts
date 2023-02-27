import { vpc as awsVpc } from '@cdktf/provider-aws';

import { InternetRoutesComponent } from './internet-routes.component';
import { BaseComponentArtifacts, BaseComponentConfig } from '../interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

/**
 * This component creates the base resources for the network: VPC, Internet Gateways
 */
export class BaseComponent extends AwsComponent<
  BaseComponentConfig,
  BaseComponentArtifacts
> {
  protected createComponents(): void {
    const { vpc, data } = this.createVpc();
    const internetGateway = this.createInternetGateway(vpc);
    const egressOnlyInternetGateway = this.createEgressOnlyInternetGateway(vpc);

    // Populate the artifacts
    this.artifacts = {
      vpc,
      vpcData: data,
      internetGateway,
      egressOnlyInternetGateway,
    };
  }

  /**
   * Create a new VPC and fetch its data to retrieve the actual cidr blocks
   */
  protected createVpc() {
    const vpc = new awsVpc.Vpc(this, 'vpc', {
      cidrBlock: `${this.config.cidrPrefix}.0.0/16`,
      assignGeneratedIpv6CidrBlock: true,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: this.getResourceNameAsTag('vpc'),
    });
    const data = new awsVpc.DataAwsVpc(this, 'vpc-data', {
      cidrBlock: `${this.config.cidrPrefix}.0.0/16`,
      dependsOn: [vpc],
    });
    return { vpc, data };
  }

  /**
   * Create an Internet Gateway and attached to the VPC
   * Also connect the vpc route table to the internet gateway with the InternetRoutesComponent
   */
  protected createInternetGateway(vpc: awsVpc.Vpc) {
    const internetGateway = new awsVpc.InternetGateway(this, 'igw', {
      vpcId: vpc.id,
      tags: this.getResourceNameAsTag('igw'),
    });
    /* eslint-disable-next-line no-new */
    new InternetRoutesComponent(this, 'internet', {
      internetGateway,
      routeTable: vpc.mainRouteTableId,
    });
    return internetGateway;
  }

  /**
   * Create an Egress Only Internet Gateway attached to the VPC
   */
  protected createEgressOnlyInternetGateway(vpc: awsVpc.Vpc) {
    return new awsVpc.EgressOnlyInternetGateway(this, 'egw', {
      vpcId: vpc.id,
      tags: this.getResourceNameAsTag('egw'),
    });
  }
}
