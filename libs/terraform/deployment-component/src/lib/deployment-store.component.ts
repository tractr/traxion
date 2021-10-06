import { S3Bucket } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export class DeploymentStoreComponent extends AwsComponent<ConstructOptions> {
  protected readonly s3Bucket: S3Bucket;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ConstructOptions = {},
  ) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
  }

  protected createS3Bucket() {
    return new S3Bucket(this, 's3', {
      provider: this.provider,
      bucketPrefix: this.getResourceName(''),
      acl: 'private',
      forceDestroy: true,
      versioning: [{ enabled: false }],
      tags: this.getResourceNameAsTag('s3'),
    });
  }

  getBucketNameAsToken(): string {
    return Token.asString(this.s3Bucket.bucket);
  }

  getBucketArnAsToken(): string {
    return Token.asString(this.s3Bucket.arn);
  }

  getBucketIdAsToken(): string {
    return Token.asString(this.s3Bucket.id);
  }
}
