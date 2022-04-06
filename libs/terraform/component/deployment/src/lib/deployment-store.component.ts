import { s3 } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class DeploymentStoreComponent extends AwsComponent {
  protected readonly s3Bucket: s3.S3Bucket;

  protected readonly s3BucketAcl: s3.S3BucketAcl;

  constructor(scope: AwsProviderConstruct, id: string, config = null) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
    this.s3BucketAcl = this.createS3BucketAcl();
  }

  protected createS3Bucket() {
    return new s3.S3Bucket(this, 's3', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      forceDestroy: true,
      versioning: { enabled: false },
      tags: this.getResourceNameAsTag('s3'),
    } as s3.S3BucketConfig);
  }

  protected createS3BucketAcl() {
    return new s3.S3BucketAcl(this, 'acl', {
      provider: this.provider,
      acl: 'private',
      bucket: this.getBucketArnAsToken(),
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
