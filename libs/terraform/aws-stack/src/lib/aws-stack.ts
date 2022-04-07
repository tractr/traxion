import { AwsProvider } from '@cdktf/provider-aws';
import { TerraformStack } from 'cdktf';
import { Construct } from 'constructs';

import { AwsStackConfig } from './interfaces';

import { AwsProviderConstruct } from '@tractr/terraform-component-aws';

export abstract class AwsStack<T extends AwsStackConfig>
  extends TerraformStack
  implements AwsProviderConstruct
{
  readonly provider: AwsProvider;

  readonly name: string;

  protected readonly config: T;

  protected constructor(scope: Construct, id: string, config: T) {
    super(scope, id);
    this.config = config;
    this.name = config.name;
    this.provider = new AwsProvider(this, 'aws', config.awsProviderConfig);
  }
}
