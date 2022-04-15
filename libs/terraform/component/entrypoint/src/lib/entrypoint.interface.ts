import { acm, elb, route53, vpc } from '@cdktf/provider-aws';
import { ITerraformDependable } from 'cdktf';

export interface EntrypointComponentConfig {
  vpc: vpc.Vpc;
  certificate: acm.AcmCertificate;
  subnets: vpc.Subnet[];
  route53Zone: route53.DataAwsRoute53Zone;
  subDomain: string;
  albDependencies?: ITerraformDependable[];
}
export interface EntrypointComponentArtifacts {
  loadBalancer: elb.Alb;
  targetGroup: elb.AlbTargetGroup;
  securityGroup: vpc.SecurityGroup;
}
