/* eslint-disable no-new */
import { s3 } from '@cdktf/provider-aws';
import { TerraformOutput } from 'cdktf';

import { S3ComponentArtifacts, S3ComponentConfig } from './s3.interface';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class S3Component extends AwsComponent<
  S3ComponentConfig,
  S3ComponentArtifacts
> {
  protected createComponents(): void {
    const bucket = this.createBucket();
    if (this.config.allowUpload) {
      this.addCors(bucket, this.config.allowUpload.origins);
    }
    if (this.config.publicRead) {
      this.addPublicPolicy(bucket);
    }
    this.addBucketToOutputs(bucket);

    // Define artifacts
    this.artifacts = { bucket };
  }

  /**
   * Creates a new S3 bucket
   */
  protected createBucket() {
    // Create S3 Bucket
    const bucket = new s3.S3Bucket(this, 'bucket', {
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      forceDestroy: true,
      tags: this.getResourceNameAsTag('bucket'),
    });
    // Add access control, versioning
    new s3.S3BucketAcl(this, 'acl', {
      acl: 'private',
      bucket: bucket.bucket,
    });
    new s3.S3BucketVersioningA(this, 'versioning', {
      bucket: bucket.bucket,
      versioningConfiguration: {
        status: 'Suspended',
      },
    });

    return bucket;
  }

  /**
   * Adds CORS rules to the bucket
   */
  protected addCors(bucket: s3.S3Bucket, origins: string[]) {
    new s3.S3BucketCorsConfiguration(this, 'cors', {
      corsRule: [
        {
          allowedHeaders: ['*'],
          allowedOrigins: origins,
          allowedMethods: ['POST', 'GET', 'PUT'],
          exposeHeaders: [],
          maxAgeSeconds: 3600,
        },
      ],
      bucket: bucket.bucket,
    });
  }

  /**
   * Adds a public read policy to the bucket
   */
  protected addPublicPolicy(bucket: s3.S3Bucket) {
    new s3.S3BucketPolicy(this, 'policy', {
      bucket: bucket.id,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicRead',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`${bucket.arn}/*`],
          },
        ],
      }),
    });
  }

  /**
   * Creates Terraform outputs for the bucket
   */
  protected addBucketToOutputs(bucket: s3.S3Bucket): void {
    new TerraformOutput(this, 'name', {
      value: bucket.bucket,
      sensitive: false,
    });
    new TerraformOutput(this, 'domain', {
      value: bucket.bucketRegionalDomainName,
      sensitive: false,
    });
  }
}
