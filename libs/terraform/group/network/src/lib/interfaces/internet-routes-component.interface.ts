import { vpc } from '@cdktf/provider-aws';

export interface InternetRoutesComponentConfig {
  routeTable: string | vpc.RouteTable; // Must be a string because it is provided by vpc.mainTableId
  internetGateway: vpc.InternetGateway;
}
export type InternetRoutesComponentArtifacts = Record<string, never>;
