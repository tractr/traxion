import { cloudwatch } from '@cdktf/provider-aws';

import { LogsArtifacts, LogsConfig } from './logs.interface';

import { AwsComponent } from '@trxn/terraform-component-aws';

export class LogsComponent extends AwsComponent<LogsConfig, LogsArtifacts> {
  protected createComponents(): void {
    // Set up CloudWatch group and log stream and retain logs for 30 days
    // Create log group
    const cloudwatchLogGroup = new cloudwatch.CloudwatchLogGroup(
      this,
      'group',
      {
        retentionInDays: 30,
        name: this.getResourceName('group'),
      },
    );

    // Create associated log stream
    /* eslint-disable-next-line no-new */
    new cloudwatch.CloudwatchLogStream(this, 'stream', {
      logGroupName: cloudwatchLogGroup.name,
      name: this.getResourceName('stream'),
    });

    // Populate artifacts
    this.artifacts = { cloudwatchLogGroup };
  }
}
