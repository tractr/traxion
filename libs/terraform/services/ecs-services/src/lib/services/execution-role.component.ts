import {
  IamRole,
  IamRoleInlinePolicy,
  IamRolePolicyAttachment,
} from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface ExecutionRoleComponentConfig extends ConstructOptions {
  secretsmanagerSecretArn: string;
}

export class ExecutionRoleComponent extends AwsComponent<ExecutionRoleComponentConfig> {
  protected readonly iamRole: IamRole;

  protected readonly iamRolePolicyAttachment: IamRolePolicyAttachment;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ExecutionRoleComponentConfig,
  ) {
    super(scope, id, config);
    this.iamRole = this.createIamRole();
    this.iamRolePolicyAttachment = this.createIamRolePolicyAttachment();
  }

  protected createIamRole() {
    // ECS task execution roles
    return new IamRole(this, 'role', {
      provider: this.provider,
      assumeRolePolicy: this.getAssumeRolePolicy(),
      inlinePolicy: this.getInlinePolicy(),
      name: this.getResourceName('role'),
    });
  }

  protected createIamRolePolicyAttachment() {
    // ECS task execution roles policy attachment
    return new IamRolePolicyAttachment(this, 'attach', {
      provider: this.provider,
      role: this.iamRole.name,
      policyArn:
        'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
    });
  }

  protected getAssumeRolePolicy(): string {
    return JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['sts:AssumeRole'],
          Principal: {
            Service: ['ecs-tasks.amazonaws.com'],
          },
        },
      ],
    });
  }

  protected getInlinePolicy(): IamRoleInlinePolicy[] {
    return [
      {
        name: this.getResourceName('policy'),
        policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'SecretsmanagerReadAccess',
              Effect: 'Allow',
              Action: ['secretsmanager:GetSecretValue'],
              Resource: [`${this.config.secretsmanagerSecretArn}*`],
            },
          ],
        }),
      },
    ];
  }

  getIamRoleArnAsToken(): string {
    return Token.asString(this.iamRole.arn);
  }
}
