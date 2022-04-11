import { iam } from '@cdktf/provider-aws';
import { TerraformOutput, Token } from 'cdktf';

import {
  S3UserComponentArtifacts,
  S3UserComponentConfig,
} from './terraform-s3-user.interface';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class S3UserComponent extends AwsComponent<
  S3UserComponentConfig,
  S3UserComponentArtifacts
> {
  protected validateConfig() {
    if (this.config.s3Buckets.length === 0) {
      throw new Error('At least one S3Arn is required');
    }
  }

  protected createComponents(): void {
    const policy = this.createPolicy();
    const user = this.createUser(policy);
    const accessKey = this.createAccessKey(user);

    // Populate the artifacts
    this.artifacts = { policy, user, accessKey };
  }

  protected createPolicy() {
    return new iam.IamPolicy(this, 'policy', {
      provider: this.provider,
      name: this.getResourceName('policy'),
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: this.getStatements(),
      }),
    });
  }

  protected createUser(policy: iam.IamPolicy) {
    const user = new iam.IamUser(this, 'user', {
      provider: this.provider,
      name: this.getResourceName('user'),
    });

    // Attach policy to user
    /* eslint-disable-next-line no-new */
    new iam.IamUserPolicyAttachment(this, 'attach', {
      provider: this.provider,
      user: user.name,
      policyArn: policy.arn,
    });

    return user;
  }

  protected createAccessKey(user: iam.IamUser) {
    const key = new iam.IamAccessKey(this, 'key', {
      provider: this.provider,
      user: user.name,
    });
    // Create outputs
    /* eslint-disable-next-line no-new */
    new TerraformOutput(this, 'id', {
      value: key.id,
      sensitive: false,
    });
    /* eslint-disable-next-line no-new */
    new TerraformOutput(this, 'secret', {
      value: key.secret,
      sensitive: true,
    });

    return key;
  }

  /**
   * Get the statements for the policy
   */
  protected getStatements() {
    return this.getWriteStatements().concat(this.getReadStatements());
  }

  /**
   * Compute the write statements from the config
   */
  protected getWriteStatements() {
    const writeArns = this.getWriteArns();
    if (writeArns.length === 0) {
      return [];
    }
    return [
      {
        Sid: 'ListObjectsInBucket',
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: writeArns,
      },
      {
        Sid: 'AllObjectActions',
        Effect: 'Allow',
        Action: ['s3:*Object*'],
        Resource: writeArns.map((arn) => `${arn}/*`),
      },
    ];
  }

  /**
   * Compute the read statements from the config
   */
  protected getReadStatements() {
    const readResources = this.getReadResources();
    if (readResources.length === 0) return [];
    return [
      {
        Sid: 'ReadOnlyAccess',
        Effect: 'Allow',
        Action: ['s3:Get*', 's3:List*'],
        Resource: readResources,
      },
    ];
  }

  protected getReadResources(): string[] {
    const readArns = this.getReadArns();
    if (readArns.length === 0) {
      return [];
    }
    const resources: string[] = [];
    for (const arn of readArns) {
      resources.push(arn, `${arn}/*`);
    }
    return resources;
  }

  /**
   * Get the S3 to write arns from the config
   */
  protected getWriteArns(): string[] {
    return this.config.s3Buckets
      .filter((bucket) => bucket.access === 'write')
      .map((bucket) => bucket.arn);
  }

  /**
   * Get the S3 to read arns from the config
   */
  protected getReadArns(): string[] {
    return this.config.s3Buckets
      .filter((bucket) => bucket.access === 'read')
      .map((bucket) => bucket.arn);
  }
}
