import {
  CloudwatchEventRule,
  CloudwatchEventTarget,
} from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface DeploymentTriggerEventComponentConfig
  extends ConstructOptions {
  roleArn: string;
  codepipelineArn: string;
  repositoryName: string;
  repositoryTag: string;
}

export class DeploymentTriggerEventComponent extends AwsComponent<DeploymentTriggerEventComponentConfig> {
  protected readonly cloudwatchEventRule: CloudwatchEventRule;

  protected readonly cloudwatchEventTarget: CloudwatchEventTarget;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentTriggerEventComponentConfig,
  ) {
    super(scope, id, config);

    this.cloudwatchEventRule = this.createCloudwatchEventRule();
    this.cloudwatchEventTarget = this.createCloudwatchEventTarget();
  }

  protected createCloudwatchEventRule() {
    return new CloudwatchEventRule(this, 'rule', {
      provider: this.provider,
      roleArn: this.config.roleArn,
      eventPattern: JSON.stringify({
        source: ['aws.ecr'],
        detail: {
          'action-type': ['PUSH'],
          'image-tag': [this.config.repositoryTag],
          'repository-name': [this.config.repositoryName],
          result: ['SUCCESS'],
        },
        'detail-type': ['ECR Image Action'],
      }),
      name: this.getResourceName('rule'),
    });
  }

  protected createCloudwatchEventTarget() {
    return new CloudwatchEventTarget(this, 'target', {
      provider: this.provider,
      rule: this.getCloudwatchEventRuleNameAsToken(),
      arn: this.config.codepipelineArn,
      roleArn: this.config.roleArn,
      targetId: this.getResourceName('target'),
    });
  }

  protected getCloudwatchEventRuleNameAsToken(): string {
    return Token.asString(this.cloudwatchEventRule.name);
  }
}