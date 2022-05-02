import { AwsProvider } from '@cdktf/provider-aws';

export function getZoneName(
  provider: AwsProvider,
  availabilityZoneLetter: string,
): string {
  return `${provider.region}${availabilityZoneLetter}`;
}
