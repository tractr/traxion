import { eventbridge } from '@cdktf/provider-aws';

import {
  DeploymentTriggerEventComponentArtifacts,
  DeploymentTriggerEventComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class DeploymentTriggerEventComponent extends AwsComponent<
  DeploymentTriggerEventComponentConfig,
  DeploymentTriggerEventComponentArtifacts
> {
  protected createComponents(): void {
    const rule = this.createRule();
    const target = this.createTarget(rule);
    // Populate the artifacts
    this.artifacts = { rule, target };
  }

  protected createRule() {
    return new eventbridge.CloudwatchEventRule(this, 'rule', {
      roleArn: this.config.role.arn,
      eventPattern: JSON.stringify({
        source: ['aws.ecr'],
        detail: {
          'action-type': ['PUSH'],
          'image-tag': [this.config.repository.imageTag],
          'repository-name': [this.config.repository.repositoryName],
          result: ['SUCCESS'],
        },
        'detail-type': ['ECR Image Action'],
      }),
      name: this.getResourceName('rule', 64),
    });
  }

  protected createTarget(rule: eventbridge.CloudwatchEventRule) {
    return new eventbridge.CloudwatchEventTarget(this, 'target', {
      rule: rule.name,
      arn: this.config.codepipeline.arn,
      roleArn: this.config.role.arn,
      targetId: this.getResourceName('target', 64),
    });
  }
}
