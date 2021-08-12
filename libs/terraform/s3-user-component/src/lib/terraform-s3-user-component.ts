import { IamAccessKey, IamPolicy, IamUser } from '@cdktf/provider-aws';
import { TerraformOutput, Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export type S3BucketAccess = 'read' | 'write';
export interface S3BucketDetails {
  access: S3BucketAccess;
  arn: string;
}
export interface S3UserComponentConfig extends ConstructOptions {
  s3Buckets: S3BucketDetails[];
}

export class S3UserComponent extends AwsComponent<S3UserComponentConfig> {
  protected readonly iamPolicy: IamPolicy;

  protected readonly iamUser: IamUser;

  protected readonly iamAccessKey: IamAccessKey;

  protected readonly iamAccessKeyIdOutput: TerraformOutput;

  protected readonly iamAccessKeySecretOutput: TerraformOutput;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: S3UserComponentConfig,
  ) {
    super(scope, id, config);
    this.checkConfig();
    this.iamPolicy = this.createIamPolicy();
    this.iamUser = this.createIamUser();
    this.iamAccessKey = this.createIamAccessKey();
    this.iamAccessKeyIdOutput = this.createIamAccessKeyIdOutput();
    this.iamAccessKeySecretOutput = this.createIamAccessKeySecretOutput();
  }

  protected checkConfig() {
    if (this.config.s3Buckets.length === 0) {
      throw new Error('At least one S3Arn is required');
    }
  }

  protected createIamPolicy() {
    return new IamPolicy(this, 'policy', {
      provider: this.provider,
      name: this.getResourceName('policy'),
      policy: this.getPolicy(),
    });
  }

  protected createIamUser() {
    return new IamUser(this, 'user', {
      provider: this.provider,
      name: this.getResourceName('user'),
      permissionsBoundary: this.getIamPolicyArnAsToken(),
    });
  }

  protected createIamAccessKey() {
    return new IamAccessKey(this, 'key', {
      provider: this.provider,
      user: this.getIamUserNameAsToken(),
    });
  }

  protected createIamAccessKeyIdOutput() {
    return new TerraformOutput(this, 'id', {
      value: this.getIamAccessKeyIdAsToken(),
      sensitive: false,
    });
  }

  protected createIamAccessKeySecretOutput() {
    return new TerraformOutput(this, 'secret', {
      value: this.getIamAccessKeySecretAsToken(),
      sensitive: true,
    });
  }

  protected getPolicy(): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: this.getStatements(),
    });
  }

  protected getStatements() {
    return this.getWriteStatements().concat(this.getReadStatements());
  }

  protected getWriteStatements() {
    const writeArns = this.getWriteArns();
    if (writeArns.length === 0) {
      return [];
    }
    return [
      {
        Sid: 'ListObjectsInBucket',
        Effect: 'Allow',
        Action: ['s3:ListBucket'],
        Resource: writeArns,
      },
      {
        Sid: 'AllObjectActions',
        Effect: 'Allow',
        Action: ['s3:*Object*'],
        Resource: writeArns.map((arn) => `${arn}/*`),
      },
    ];
  }

  protected getReadStatements() {
    const readResources = this.getReadResources();
    if (readResources.length === 0) return [];
    return [
      {
        Sid: 'ReadOnlyAccess',
        Effect: 'Allow',
        Action: ['s3:Get*', 's3:List*'],
        Resource: readResources,
      },
    ];
  }

  protected getReadResources(): string[] {
    const readArns = this.getReadArns();
    if (readArns.length === 0) {
      return [];
    }
    const resources: string[] = [];
    for (const arn of readArns) {
      resources.push(arn, `${arn}/*`);
    }
    return resources;
  }

  protected getReadArns(): string[] {
    return this.config.s3Buckets
      .filter((bucket) => bucket.access === 'read')
      .map((bucket) => bucket.arn);
  }

  protected getWriteArns(): string[] {
    return this.config.s3Buckets
      .filter((bucket) => bucket.access === 'write')
      .map((bucket) => bucket.arn);
  }

  getIamUserNameAsToken(): string {
    return Token.asString(this.iamUser.name);
  }

  getIamPolicyArnAsToken(): string {
    return Token.asString(this.iamPolicy.arn);
  }

  getIamAccessKeyIdAsToken(): string {
    return Token.asString(this.iamAccessKey.id);
  }

  getIamAccessKeySecretAsToken(): string {
    return Token.asString(this.iamAccessKey.secret);
  }
}
