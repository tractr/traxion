import { s3 } from '@cdktf/provider-aws';
import { TerraformOutput, Token } from 'cdktf';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface S3ComponentConfig {
  publicRead?: boolean;
  allowUpload?: {
    origins: string[];
  };
}

export class S3Component extends AwsComponent<S3ComponentConfig> {
  protected readonly s3Bucket: s3.S3Bucket;

  protected readonly s3BucketAcl: s3.S3BucketAcl;

  protected readonly s3BucketVersioning: s3.S3BucketVersioningA;

  protected readonly s3BucketCorsConfiguration:
    | s3.S3BucketCorsConfiguration
    | undefined;

  protected readonly s3BucketPolicy: s3.S3BucketPolicy | undefined;

  protected readonly s3BucketNameOutput: TerraformOutput;

  protected readonly s3BucketRegionalDomainNameOutput: TerraformOutput;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: S3ComponentConfig,
  ) {
    super(scope, id, config);
    this.s3Bucket = this.createS3Bucket();
    this.s3BucketAcl = this.createS3BucketAcl();
    this.s3BucketVersioning = this.createS3BucketVersioning();
    this.s3BucketCorsConfiguration = this.createS3BucketCorsConfiguration();
    if (this.config.publicRead) {
      this.s3BucketPolicy = this.createS3BucketPublicPolicy();
    }
    this.s3BucketNameOutput = this.createS3BucketNameOutput();
    this.s3BucketRegionalDomainNameOutput =
      this.createS3BucketRegionalDomainNameOutput();
  }

  protected createS3Bucket() {
    return new s3.S3Bucket(this, 'bucket', {
      provider: this.provider,
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      forceDestroy: true,
      tags: this.getResourceNameAsTag('bucket'),
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

  protected createS3BucketCorsConfiguration() {
    const rules = this.getCorsRules();
    if (rules.length === 0) {
      return undefined;
    }
    return new s3.S3BucketCorsConfiguration(this, 'cors', {
      provider: this.provider,
      corsRule: rules,
      bucket: this.getBucketNameAsToken(),
    });
  }

  protected getCorsRules(): s3.S3BucketCorsConfigurationCorsRule[] {
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
    return new s3.S3BucketPolicy(this, 'policy', {
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
