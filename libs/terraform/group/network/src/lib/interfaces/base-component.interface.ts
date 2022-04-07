export interface BaseComponentConfig {
  cidrPrefix: string;
  zones: string[];
}
export interface BaseComponentArtifacts {
  vpcId: string;
  vpcMainRouteTableId: string;
  internetGatewayId: string;
  egressOnlyInternetGatewayId: string;
  cidrBlock: string;
  ipv6CidrBlock: string;
}
