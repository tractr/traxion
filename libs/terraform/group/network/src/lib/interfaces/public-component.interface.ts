import { vpc } from '@cdktf/provider-aws';

export interface PublicComponentConfig {
  vpc: vpc.Vpc;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
}
export interface PublicComponentArtifacts {
  subnet: vpc.Subnet;
}
