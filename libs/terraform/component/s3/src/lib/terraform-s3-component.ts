import {
  S3Bucket,
  S3BucketCorsRule,
  S3BucketPolicy,
} from '@cdktf/provider-aws';
import { TerraformOutput, Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface S3ComponentConfig extends ConstructOptions {
  publicRead?: boolean;
  allowUpload?: {
    origins: string[];
  };
}

export class S3Component extends AwsComponent<S3ComponentConfig> {
  protected readonly s3Bucket: S3Bucket;

  protected readonly s3BucketPolicy: S3BucketPolicy | undefined;

  protected readonly s3BucketNameOutput: TerraformOutput;

  protected readonly s3BucketRegionalDomainNameOutput: TerraformOutput;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: S3ComponentConfig,
  ) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
    if (this.config.publicRead) {
      this.s3BucketPolicy = this.createS3BucketPublicPolicy();
    }
    this.s3BucketNameOutput = this.createS3BucketNameOutput();
    this.s3BucketRegionalDomainNameOutput =
      this.createS3BucketRegionalDomainNameOutput();
  }

  protected createS3Bucket() {
    return new S3Bucket(this, 'bucket', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('').replace(/_/g, '-'),
      corsRule: this.getCorsRules(),
      acl: 'private',
      forceDestroy: true,
      versioning: [{ enabled: false }],
      tags: this.getResourceNameAsTag('bucket'),
    });
  }

  protected getCorsRules(): S3BucketCorsRule[] {
    if (!this.config.allowUpload) return [];
    return [
      {
        allowedHeaders: ['*'],
        allowedOrigins: this.config.allowUpload.origins,
        allowedMethods: ['POST', 'GET', 'PUT'],
        exposeHeaders: [],
        maxAgeSeconds: 3600,
      },
    ];
  }

  protected createS3BucketPublicPolicy() {
    return new S3BucketPolicy(this, 'policy', {
      bucket: this.getBucketIdAsToken(),
      policy: this.getBucketPublicPolicy(),
    });
  }

  protected createS3BucketNameOutput() {
    return new TerraformOutput(this, 'name', {
      value: this.getBucketNameAsToken(),
      sensitive: false,
    });
  }

  protected getBucketPublicPolicy(): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'PublicRead',
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`${this.getBucketArnAsToken()}/*`],
        },
      ],
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
