/* eslint-disable no-new */
import { s3 } from '@cdktf/provider-aws';

import {
  DeploymentStoreComponentArtifacts,
  DeploymentStoreComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class DeploymentStoreComponent extends AwsComponent<
  DeploymentStoreComponentConfig,
  DeploymentStoreComponentArtifacts
> {
  protected createComponents(): void {
    const bucket = this.createS3Bucket();
    // Populate artifacts
    this.artifacts = { bucket };
  }

  protected createS3Bucket() {
    const bucket = new s3.S3Bucket(this, 's3', {
      bucketPrefix: this.getResourceName('', 37).replace(/_/g, '-'),
      forceDestroy: true,
      tags: this.getResourceNameAsTag('s3'),
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
}
