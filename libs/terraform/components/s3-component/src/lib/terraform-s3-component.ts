import { S3Bucket } from '@cdktf/provider-aws';
import { TerraformOutput, Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export class S3Component extends AwsComponent<ConstructOptions> {
  protected readonly s3Bucket: S3Bucket;

  protected readonly s3BucketNameOutput: TerraformOutput;

  protected readonly s3BucketRegionalDomainNameOutput: TerraformOutput;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ConstructOptions = {},
  ) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
    this.s3BucketNameOutput = this.createS3BucketNameOutput();
    this.s3BucketRegionalDomainNameOutput =
      this.createS3BucketRegionalDomainNameOutput();
  }

  protected createS3Bucket() {
    return new S3Bucket(this, 'bucket', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('').replace(/_/g, '-'),
      acl: 'private',
      forceDestroy: true,
      versioning: [{ enabled: false }],
      tags: this.getResourceNameAsTag('bucket'),
    });
  }

  protected createS3BucketNameOutput() {
    return new TerraformOutput(this, 'name', {
      value: this.getBucketNameAsToken(),
      sensitive: false,
    });
  }

  protected createS3BucketRegionalDomainNameOutput() {
    return new TerraformOutput(this, 'domain', {
      value: this.getBucketRegionalDomainNameAsToken(),
      sensitive: false,
    });
  }

  getBucketNameAsToken(): string {
    return Token.asString(this.s3Bucket.bucket);
  }

  getBucketRegionalDomainNameAsToken(): string {
    return Token.asString(this.s3Bucket.bucketRegionalDomainName);
  }

  getBucketArnAsToken(): string {
    return Token.asString(this.s3Bucket.arn);
  }

  getBucketIdAsToken(): string {
    return Token.asString(this.s3Bucket.id);
  }
}
