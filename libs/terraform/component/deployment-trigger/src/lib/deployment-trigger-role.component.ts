import { iam } from '@cdktf/provider-aws';

import {
  DeploymentTriggerRoleComponentArtifacts,
  DeploymentTriggerRoleComponentConfig,
} from './interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class DeploymentTriggerRoleComponent extends AwsComponent<
  DeploymentTriggerRoleComponentConfig,
  DeploymentTriggerRoleComponentArtifacts
> {
  protected createComponents(): void {
    const role = this.createRole();
    const policy = this.createPolicy();
    this.attachPolicyToRole(role, policy);
    // Populate the artifacts
    this.artifacts = { role, policy };
  }

  protected createPolicy() {
    return new iam.IamPolicy(this, 'policy', {
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['codepipeline:StartPipelineExecution'],
            Resource: [this.config.codepipeline.arn],
          },
        ],
      }),
      name: this.getResourceName('policy'),
    });
  }

  protected createRole() {
    // ECS task execution roles
    return new iam.IamRole(this, 'role', {
      assumeRolePolicy: JSON.stringify({
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
      }),
      name: this.getResourceName('role'),
    });
  }

  protected attachPolicyToRole(role: iam.IamRole, policy: iam.IamPolicy) {
    return new iam.IamRolePolicyAttachment(this, 'attach', {
      role: role.name,
      policyArn: policy.arn,
    });
  }
}
