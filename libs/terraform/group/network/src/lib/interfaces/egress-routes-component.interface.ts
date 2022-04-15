import { vpc } from '@cdktf/provider-aws';

export interface EgressRoutesComponentConfig {
  routeTable: vpc.RouteTable;
  egressOnlyInternetGateway: vpc.EgressOnlyInternetGateway;
}
export type EgressRoutesComponentArtifacts = Record<string, never>;
