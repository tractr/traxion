import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';
import { S3Component } from '@tractr/terraform-component-s3';
import {
  S3BucketDetails,
  S3UserComponent,
} from '@tractr/terraform-component-s3-user';

export interface FileStorageComponentConfig {
  additionalReadOnlyS3Arns?: string[];
  s3PublicRead?: boolean;
  s3AllowUpload?: {
    origins: string[];
  };
}

export class FileStorageComponent extends AwsComponent<FileStorageComponentConfig> {
  protected readonly s3Component: S3Component;

  protected readonly s3UserComponent: S3UserComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: FileStorageComponentConfig = {},
  ) {
    super(scope, id, config);
    this.s3Component = this.createS3Component();
    this.s3UserComponent = this.createS3UserComponent();
  }

  protected createS3Component() {
    return new S3Component(this, 's3', {
      publicRead: this.config.s3PublicRead,
      allowUpload: this.config.s3AllowUpload,
    });
  }

  protected createS3UserComponent() {
    const buckets: S3BucketDetails[] = [
      { access: 'write', arn: this.s3Component.getBucketArnAsToken() },
    ];

    if (this.config.additionalReadOnlyS3Arns) {
      for (const arn of this.config.additionalReadOnlyS3Arns) {
        buckets.push({ access: 'read', arn });
      }
    }

    return new S3UserComponent(this, 'write', {
      s3Buckets: buckets,
    });
  }

  getS3BucketDomainName(): string {
    return this.s3Component.getBucketRegionalDomainNameAsToken();
  }

  getS3BucketName(): string {
    return this.s3Component.getBucketNameAsToken();
  }
}
