import { secretsmanager } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class SecretsComponent extends AwsComponent {
  protected readonly secretsmanagerSecret: secretsmanager.SecretsmanagerSecret;

  constructor(scope: AwsProviderConstruct, id: string, config = null) {
    super(scope, id, config);
    this.secretsmanagerSecret = this.createSecretsmanagerSecret();
  }

  protected createSecretsmanagerSecret() {
    return new secretsmanager.SecretsmanagerSecret(this, 'object', {
      name: this.getResourceName('object'),
    });
  }

  getSecretsmanagerSecretArnAsToken(): string {
    return Token.asString(this.secretsmanagerSecret.arn);
  }
}
