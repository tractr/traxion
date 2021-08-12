import { AwsProvider } from '@cdktf/provider-aws';
import { Construct } from 'constructs';

export interface AwsProviderConstruct extends Construct {
  provider: AwsProvider;
  name: string;
}
