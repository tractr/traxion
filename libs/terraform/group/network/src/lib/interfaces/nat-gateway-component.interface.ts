import { ec2, vpc } from '@cdktf/provider-aws';

export interface NatGatewayComponentConfig {
  routeTableId: string;
  publicSubnetId: string;
}
export interface NatGatewayComponentArtifacts {
  natGateway: vpc.NatGateway;
  eip: ec2.Eip;
}
