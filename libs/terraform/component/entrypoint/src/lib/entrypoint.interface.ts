import { elb, vpc } from '@cdktf/provider-aws';
import { ITerraformDependable } from 'cdktf';

export interface EntrypointComponentConfig {
  vpcId: string;
  certificateArn: string;
  subnetsIds: string[];
  route53ZoneId: string;
  subDomain: string;
  albDependencies?: ITerraformDependable[];
}
export interface EntrypointComponentArtifacts {
  loadBalancer: elb.Alb;
  targetGroup: elb.AlbTargetGroup;
  securityGroup: vpc.SecurityGroup;
}
