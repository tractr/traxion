import { secretsmanager } from '@cdktf/provider-aws';

import {
  SecretsComponentArtifacts,
  SecretsComponentConfig,
} from './secrets.interface';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class SecretsComponent extends AwsComponent<
  SecretsComponentConfig,
  SecretsComponentArtifacts
> {
  protected createComponents(): void {
    /* eslint-disable-next-line no-new */
    const secret = new secretsmanager.SecretsmanagerSecret(this, 'object', {
      name: this.getResourceName('object'),
    });

    // Populate the artifacts
    this.artifacts = { secret };
  }
}
