import { ConstructOptions } from 'constructs';

import { InternetAccessMode } from '../components';

export interface AvailabilityZoneInfo {
  fullName: string;
  shortName: string;
}

/**
 * This group creates all the network resources required by the backend (ECS, ALB, etc.)
 * It uses at least 2 availability zones and creates one private and one public subnet in each zone.
 * Internet access within private subnets can be set to 3 modes: Nat, Egress or None
 */
export interface NetworkGroupConfig extends NetworkGroupPublicConfig {
  zones: string[];
  cidrPrefix?: string;
  /**
   * Private subnets for backend components (ecs tasks, etc.) may have access to internet with different mode
   *
   * NAT gateway:
   * Therefore instances that require an access to internet don't need a public IP address:
   * https://medium.com/awesome-cloud/aws-vpc-difference-between-internet-gateway-and-nat-gateway-c9177e710af6
   * NAT Gateway have a cost: https://aws.amazon.com/vpc/pricing/
   *
   * Egress Only Internet Gateway:
   * The private subnet will use a Egress Only Internet Gateway to provide
   * internet access to the instances, but IPv6 only:
   * https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html
   * Pulling docker image from Docker Hub requires Ipv4
   *
   * Internet Gateway:
   * The private subnet will use an Internet Gateway to provide internet access to the instances.
   * Therefore, the private network won't be private anymore, but instances will be protected by the security groups
   *
   * No internet access
   * The instances on this subnet won't be able to access internet.
   */
  internetAccessMode: InternetAccessMode;
}

export interface NetworkGroupPublicConfig extends ConstructOptions {
  zones: string[];
  cidrPrefix?: string;
  internetAccessMode?: InternetAccessMode;
}
