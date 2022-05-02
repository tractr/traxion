import {
  FileStorageComponentArtifacts,
  FileStorageComponentConfig,
} from './file-storage.interface';

import { AwsComponent } from '@tractr/terraform-component-aws';
import { S3Component } from '@tractr/terraform-component-s3';
import {
  S3BucketDetails,
  S3UserComponent,
} from '@tractr/terraform-component-s3-user';

export class FileStorageComponent extends AwsComponent<
  FileStorageComponentConfig,
  FileStorageComponentArtifacts
> {
  protected createComponents(): void {
    const s3Component = this.createS3Component();
    const s3UserComponent = this.createS3UserComponent(s3Component);
    this.artifacts = {
      ...s3Component.artifacts,
      ...s3UserComponent.artifacts,
    };
  }

  protected createS3Component() {
    return new S3Component(this, 's3', {
      publicRead: this.config.s3PublicRead,
      allowUpload: this.config.s3AllowUpload,
    });
  }

  protected createS3UserComponent(s3Component: S3Component) {
    const buckets: S3BucketDetails[] = [
      { access: 'write', bucket: s3Component.artifacts.bucket },
    ];

    if (this.config.additionalReadOnlyS3Buckets) {
      for (const bucket of this.config.additionalReadOnlyS3Buckets) {
        buckets.push({ access: 'read', bucket });
      }
    }

    return new S3UserComponent(this, 'write', {
      s3Buckets: buckets,
    });
  }
}
