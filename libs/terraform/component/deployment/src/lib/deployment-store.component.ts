import { s3 } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class DeploymentStoreComponent extends AwsComponent {
  protected readonly s3Bucket: s3.S3Bucket;

  protected readonly s3BucketAcl: s3.S3BucketAcl;

  protected readonly s3BucketVersioning: s3.S3BucketVersioningA;

  constructor(scope: AwsProviderConstruct, id: string, config = null) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
    this.s3BucketAcl = this.createS3BucketAcl();
    this.s3BucketVersioning = this.createS3BucketVersioning();
  }

  protected createS3Bucket() {
    return new s3.S3Bucket(this, 's3', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      forceDestroy: true,
      tags: this.getResourceNameAsTag('s3'),
    });
  }

  protected createS3BucketAcl() {
    return new s3.S3BucketAcl(this, 'acl', {
      provider: this.provider,
      acl: 'private',
      bucket: this.getBucketNameAsToken(),
    });
  }

  protected createS3BucketVersioning() {
    return new s3.S3BucketVersioningA(this, 'versioning', {
      provider: this.provider,
      bucket: this.getBucketNameAsToken(),
      versioningConfiguration: {
        status: 'Disabled',
      },
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
