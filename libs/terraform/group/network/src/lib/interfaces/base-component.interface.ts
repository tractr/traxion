import { vpc as awsVpc } from '@cdktf/provider-aws';

export interface BaseComponentConfig {
  cidrPrefix: string;
  zones: string[];
}
export interface BaseComponentArtifacts {
  vpc: awsVpc.Vpc;
  vpcData: awsVpc.DataAwsVpc;
  internetGateway: awsVpc.InternetGateway;
  egressOnlyInternetGateway: awsVpc.EgressOnlyInternetGateway;
}
