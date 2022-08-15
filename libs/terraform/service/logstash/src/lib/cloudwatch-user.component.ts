import { iam } from '@cdktf/provider-aws';

import {
  CloudwatchUserComponentArtifacts,
  CloudwatchUserComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class CloudwatchUserComponent extends AwsComponent<
  CloudwatchUserComponentConfig,
  CloudwatchUserComponentArtifacts
> {
  protected createComponents(): void {
    const policy = this.createPolicy();
    const user = this.createUser(policy);
    const accessKey = this.createAccessKey(user);

    // Populate the artifacts
    this.artifacts = { policy, user, accessKey };
  }

  /**
   * Grant read access to Cloudwatch logs and Cloudwatch metrics
   */
  protected createPolicy() {
    return new iam.IamPolicy(this, 'policy', {
      name: this.getResourceName('policy'),
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: [
              'cloudwatch:Describe*',
              'cloudwatch:Get*',
              'cloudwatch:List*',
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
    });
  }

  protected createUser(policy: iam.IamPolicy) {
    const user = new iam.IamUser(this, 'user', {
      name: this.getResourceName('user'),
    });

    // Attach policy to user
    /* eslint-disable-next-line no-new */
    new iam.IamUserPolicyAttachment(this, 'attach', {
      user: user.name,
      policyArn: policy.arn,
    });

    return user;
  }

  protected createAccessKey(user: iam.IamUser) {
    return new iam.IamAccessKey(this, 'key', {
      user: user.name,
    });
  }
}
