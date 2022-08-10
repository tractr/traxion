import { iam } from '@cdktf/provider-aws';

import { AwsComponent } from '@tractr/terraform-component-aws';
import {
  LogstashTaskRoleComponentArtifacts,
  LogstashTaskRoleComponentConfig,
} from '@tractr/terraform-service-logstash';

export class LogstashTaskRoleComponent extends AwsComponent<
  LogstashTaskRoleComponentConfig,
  LogstashTaskRoleComponentArtifacts
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

  /**
   * Grant read access to Cloudwatch logs and Cloudwatch metrics
   */
  protected getInlinePolicy(): iam.IamRoleInlinePolicy[] {
    return [
      {
        name: this.getResourceName('policy'),
        policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Action: [
                'cloudwatch:getMetricData',
                'cloudwatch:ListMetrics',
                'logs:Describe*',
                'logs:Get*',
                'logs:List*',
                'logs:StartQuery',
                'logs:StopQuery',
                'logs:TestMetricFilter',
                'logs:FilterLogEvents',
              ],
              Effect: 'Allow',
              Resource: '*',
            },
          ],
        }),
      },
    ];
  }
}
