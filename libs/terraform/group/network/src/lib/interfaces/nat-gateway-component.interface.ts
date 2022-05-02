import { ec2, vpc } from '@cdktf/provider-aws';

export interface NatGatewayComponentConfig {
  routeTable: vpc.RouteTable;
  publicSubnet: vpc.Subnet;
}
export interface NatGatewayComponentArtifacts {
  natGateway: vpc.NatGateway;
  eip: ec2.Eip;
}
