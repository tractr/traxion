import { AwsProvider } from '@cdktf/provider-aws';
import { snake } from 'case';
import { Construct, ConstructOptions } from 'constructs';

import { AwsProviderConstruct } from './interfaces';

export abstract class AwsComponent<T extends ConstructOptions>
  extends Construct
  implements AwsProviderConstruct
{
  readonly provider: AwsProvider;

  readonly name: string;

  protected readonly config: T;

  protected constructor(scope: AwsProviderConstruct, id: string, config: T) {
    super(scope, id, config);
    this.config = config;
    this.name = `${scope.name.trim()}-${snake(id)}`;
    this.provider = scope.provider;
  }

  protected getResourceName(resource: string): string {
    return `${this.name.trim()}-${snake(resource)}`;
  }

  protected getResourceNameAsTag(resource: string): { Name: string } {
    return { Name: this.getResourceName(resource) };
  }
}

export type AwsComponentConstructor<
  C extends AwsComponent<O>,
  O extends ConstructOptions,
> = new (scope: AwsProviderConstruct, id: string, config: O) => C;
