import { cloudwatch } from '@cdktf/provider-aws';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export class LogsComponent extends AwsComponent {
  protected readonly cloudwatchLogGroup: cloudwatch.CloudwatchLogGroup;

  protected readonly cloudwatchLogStream: cloudwatch.CloudwatchLogStream;

  constructor(scope: AwsProviderConstruct, id: string, config = null) {
    super(scope, id, config);
    this.cloudwatchLogGroup = this.createCloudwatchLogGroup();
    this.cloudwatchLogStream = this.createCloudwatchLogStream();
  }

  protected createCloudwatchLogGroup() {
    // Set up CloudWatch group and log stream and retain logs for 30 days
    return new cloudwatch.CloudwatchLogGroup(this, 'group', {
      provider: this.provider,
      retentionInDays: 30,
      name: this.getResourceName('group'),
    });
  }

  protected createCloudwatchLogStream() {
    return new cloudwatch.CloudwatchLogStream(this, 'stream', {
      provider: this.provider,
      logGroupName: this.getCloudwatchLogGroupName(),
      name: this.getResourceName('stream'),
    });
  }

  getCloudwatchLogGroupName(): string {
    return this.cloudwatchLogGroup.name;
  }
}
