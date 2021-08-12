import { AwsProviderConfig } from '@cdktf/provider-aws';

export interface AwsStackConfig {
  name: string;
  awsProviderConfig: AwsProviderConfig;
}
