import { cloudwatch } from '@cdktf/provider-aws';

export type LogsConfig = Record<string, never>;
export interface LogsArtifacts {
  cloudwatchLogGroup: cloudwatch.CloudwatchLogGroup;
}
