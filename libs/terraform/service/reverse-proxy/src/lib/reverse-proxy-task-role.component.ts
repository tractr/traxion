import { iam } from '@cdktf/provider-aws';

import {
  ReverseProxyTaskRoleComponentArtifacts,
  ReverseProxyTaskRoleComponentConfig,
} from './interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class ReverseProxyTaskRoleComponent extends AwsComponent<
  ReverseProxyTaskRoleComponentConfig,
  ReverseProxyTaskRoleComponentArtifacts
> {
  protected createComponents(): void {
    // ECS task execution roles
    const role = new iam.IamRole(this, 'role', {
      assumeRolePolicy: this.getAssumeRolePolicy(),
      inlinePolicy: this.getInlinePolicy(),
      name: this.getResourceName('role'),
    });

    // Populate the artifacts
    this.artifacts = { role };
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

  protected getInlinePolicy(): iam.IamRoleInlinePolicy[] {
    return [
      {
        name: this.getResourceName('policy'),
        policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Sid: 'ReverseProxyECSReadAccess',
              Effect: 'Allow',
              Action: [
                'ecs:ListClusters',
                'ecs:DescribeClusters',
                'ecs:ListTasks',
                'ecs:DescribeTasks',
                'ecs:DescribeContainerInstances',
                'ecs:DescribeTaskDefinition',
                'ec2:DescribeInstances',
              ],
              Resource: ['*'],
            },
          ],
        }),
      },
    ];
  }
}
