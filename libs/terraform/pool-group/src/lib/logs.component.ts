import { CloudwatchLogGroup, CloudwatchLogStream } from '@cdktf/provider-aws';
import { ConstructOptions } from 'constructs';

import { AwsComponent } from '../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../abstracts/aws.interface';

export class LogsComponent extends AwsComponent<ConstructOptions> {
  protected readonly cloudwatchLogGroup: CloudwatchLogGroup;

  protected readonly cloudwatchLogStream: CloudwatchLogStream;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: ConstructOptions = {},
  ) {
    super(scope, id, config);
    this.cloudwatchLogGroup = this.createCloudwatchLogGroup();
    this.cloudwatchLogStream = this.createCloudwatchLogStream();
  }

  protected createCloudwatchLogGroup() {
    // Set up CloudWatch group and log stream and retain logs for 30 days
    return new CloudwatchLogGroup(this, 'group', {
      provider: this.provider,
      retentionInDays: 30,
      name: this.getResourceName('group'),
    });
  }

  protected createCloudwatchLogStream() {
    return new CloudwatchLogStream(this, 'stream', {
      provider: this.provider,
      logGroupName: this.getCloudwatchLogGroupName(),
      name: this.getResourceName('stream'),
    });
  }

  getCloudwatchLogGroupName(): string {
    return this.cloudwatchLogGroup.name;
  }
}
