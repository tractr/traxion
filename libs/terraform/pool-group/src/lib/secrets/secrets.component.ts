import { SecretsmanagerSecret } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import { AwsComponent } from '../../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../../abstracts/aws.interface';

export class SecretsComponent extends AwsComponent<ConstructOptions> {
  protected readonly secretsmanagerSecret: SecretsmanagerSecret;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ConstructOptions = {},
  ) {
    super(scope, id, config);
    this.secretsmanagerSecret = this.createSecretsmanagerSecret();
  }

  protected createSecretsmanagerSecret() {
    return new SecretsmanagerSecret(this, 'object', {
      name: this.getResourceName('object'),
    });
  }

  getSecretsmanagerSecretArnAsToken(): string {
    return Token.asString(this.secretsmanagerSecret.arn);
  }
}
