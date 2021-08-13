import {
  IamPolicy,
  IamRole,
  IamRolePolicyAttachment,
} from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import { AwsComponent } from '../../../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../../../abstracts/aws.interface';

export interface DeploymentTriggerRoleComponentConfig extends ConstructOptions {
  codepipelineArn: string;
}

export class DeploymentTriggerRoleComponent extends AwsComponent<DeploymentTriggerRoleComponentConfig> {
  protected readonly iamPolicy: IamPolicy;

  protected readonly iamRole: IamRole;

  protected readonly iamRolePolicyAttachment: IamRolePolicyAttachment;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentTriggerRoleComponentConfig,
  ) {
    super(scope, id, config);

    this.iamPolicy = this.createIamPolicy();
    this.iamRole = this.createIamRole();
    this.iamRolePolicyAttachment = this.createIamRolePolicyAttachment();
  }

  protected createIamPolicy() {
    return new IamPolicy(this, 'policy', {
      provider: this.provider,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['codepipeline:StartPipelineExecution'],
            Resource: [this.config.codepipelineArn],
          },
        ],
      }),
      name: this.getResourceName('policy'),
    });
  }

  protected createIamRole() {
    // ECS task execution roles
    return new IamRole(this, 'role', {
      provider: this.provider,
      assumeRolePolicy: this.getAssumeRolePolicy(),
      name: this.getResourceName('role'),
    });
  }

  protected getAssumeRolePolicy(): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: '',
          Effect: 'Allow',
          Principal: {
            Service: ['events.amazonaws.com'],
          },
          Action: 'sts:AssumeRole',
        },
      ],
    });
  }

  protected createIamRolePolicyAttachment() {
    return new IamRolePolicyAttachment(this, 'attach', {
      provider: this.provider,
      role: this.getIamRoleNameAsToken(),
      policyArn: this.getIamPolicyArnAsToken(),
    });
  }

  getIamRoleArnAsToken(): string {
    return Token.asString(this.iamRole.arn);
  }

  protected getIamRoleNameAsToken(): string {
    return Token.asString(this.iamRole.name);
  }

  protected getIamPolicyArnAsToken(): string {
    return Token.asString(this.iamPolicy.arn);
  }
}
