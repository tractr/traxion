import { vpc } from '@cdktf/provider-aws';

export type InternetAccessMode = 'nat' | 'egress' | 'igw' | 'none';

export interface PrivateComponentConfig {
  vpc: vpc.Vpc;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
  /** Enable internet access through NAT Gateway or Egress */
  internetAccessMode: InternetAccessMode;
  publicSubnet?: vpc.Subnet;
  egressOnlyInternetGateway?: vpc.EgressOnlyInternetGateway;
  internetGateway?: vpc.InternetGateway;
}
export interface PrivateComponentArtifacts {
  routeTable: vpc.RouteTable;
  subnet: vpc.Subnet;
}
