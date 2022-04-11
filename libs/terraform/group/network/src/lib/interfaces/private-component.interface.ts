import { vpc } from '@cdktf/provider-aws';

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
export interface PrivateComponentArtifacts {
  routeTable: vpc.RouteTable;
  subnet: vpc.Subnet;
}
