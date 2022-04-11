import { vpc } from '@cdktf/provider-aws';

export interface PublicComponentConfig {
  vpcId: string;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
}
export interface PublicComponentArtifacts {
  subnet: vpc.Subnet;
}
