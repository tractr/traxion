export interface PublicComponentConfig {
  vpcId: string;
  cidrBlock: string;
  ipv6CidrBlock: string;
  availabilityZone: string;
}
export interface PublicComponentArtifacts {
  subnetId: string;
}
