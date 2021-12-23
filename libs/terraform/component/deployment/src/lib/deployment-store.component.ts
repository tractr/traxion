import { s3 } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class DeploymentStoreComponent extends AwsComponent {
  protected readonly s3Bucket: s3.S3Bucket;

  constructor(scope: AwsProviderConstruct, id: string, config = null) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
  }

  protected createS3Bucket() {
    return new s3.S3Bucket(this, 's3', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      acl: 'private',
      forceDestroy: true,
      versioning: { enabled: false },
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
