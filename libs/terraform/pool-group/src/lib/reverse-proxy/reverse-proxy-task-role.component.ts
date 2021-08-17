import { IamRole, IamRoleInlinePolicy } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export class ReverseProxyTaskRoleComponent extends AwsComponent<ConstructOptions> {
  protected readonly iamRole: IamRole;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ConstructOptions = {},
  ) {
    super(scope, id, config);
    this.iamRole = this.createIamRole();
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

  getIamRoleArnAsToken(): string {
    return Token.asString(this.iamRole.arn);
  }
}
