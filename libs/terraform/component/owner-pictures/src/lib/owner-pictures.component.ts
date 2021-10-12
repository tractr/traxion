import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';
import { S3Component } from '@tractr/terraform-component-s3';
import {
  S3BucketDetails,
  S3UserComponent,
} from '@tractr/terraform-component-s3-user';

export interface OwnerPicturesComponentConfig extends ConstructOptions {
  additionalReadOnlyS3Arns?: string[];
}

export class OwnerPicturesComponent extends AwsComponent<OwnerPicturesComponentConfig> {
  protected readonly s3Component: S3Component;

  protected readonly s3UserComponent: S3UserComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: OwnerPicturesComponentConfig = {},
  ) {
    super(scope, id, config);
    this.s3Component = this.createS3Component();
    this.s3UserComponent = this.createS3UserComponent();
  }

  protected createS3Component() {
    return new S3Component(this, 's3');
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
