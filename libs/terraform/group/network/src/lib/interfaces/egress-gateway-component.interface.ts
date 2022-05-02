import { vpc } from '@cdktf/provider-aws';

export interface EgressGatewayComponentConfig {
  routeTable: vpc.RouteTable;
  egressOnlyInternetGateway: vpc.EgressOnlyInternetGateway;
}
export type EgressGatewayComponentArtifacts = Record<string, never>;
