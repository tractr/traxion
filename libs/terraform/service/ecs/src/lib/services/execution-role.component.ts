import { iam } from '@cdktf/provider-aws';

import {
  ExecutionRoleComponentArtifacts,
  ExecutionRoleComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class ExecutionRoleComponent extends AwsComponent<
  ExecutionRoleComponentConfig,
  ExecutionRoleComponentArtifacts
> {
  protected createComponents(): void {
    const role = this.createRole();
    this.attachPolicyToRole(role);

    // Populate the artifacts
    this.artifacts = { role };
  }

  protected createRole() {
    // ECS task execution roles
    return new iam.IamRole(this, 'role', {
      assumeRolePolicy: JSON.stringify({
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
      }),
      inlinePolicy: [
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
      ],
      name: this.getResourceName('role'),
    });
  }

  protected attachPolicyToRole(role: iam.IamRole) {
    // ECS task execution roles policy attachment
    return new iam.IamRolePolicyAttachment(this, 'attach', {
      role: role.name,
      policyArn:
        'arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy',
    });
  }
}
