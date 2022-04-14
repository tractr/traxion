/* eslint-disable no-new */
import { elb, route53, vpc } from '@cdktf/provider-aws';

import {
  EntrypointComponentArtifacts,
  EntrypointComponentConfig,
} from './entrypoint.interface';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class EntrypointComponent extends AwsComponent<
  EntrypointComponentConfig,
  EntrypointComponentArtifacts
> {
  protected createComponents(): void {
    const securityGroup = this.createSecurityGroup();
    const loadBalancer = this.createLoadBalancer(securityGroup);
    const targetGroup = this.createTargetGroup();
    this.createHttpListeners(loadBalancer, targetGroup);
    this.routeTrafficToLoadBalancer(loadBalancer);
    // Populate the artifacts
    this.artifacts = {
      loadBalancer,
      targetGroup,
      securityGroup,
    };
  }

  protected createSecurityGroup() {
    return new vpc.SecurityGroup(this, 'sg', {
      ingress: [
        {
          protocol: 'tcp',
          fromPort: 80,
          toPort: 80,
          cidrBlocks: ['0.0.0.0/0'],
          ipv6CidrBlocks: ['::/0'],
        },
        {
          protocol: 'tcp',
          fromPort: 443,
          toPort: 443,
          cidrBlocks: ['0.0.0.0/0'],
          ipv6CidrBlocks: ['::/0'],
        },
      ],
      egress: [
        {
          protocol: '-1',
          fromPort: 0,
          toPort: 0,
          cidrBlocks: ['0.0.0.0/0'],
          ipv6CidrBlocks: ['::/0'],
        },
      ],
      vpcId: this.config.vpc.id,
      name: this.getResourceName('sg'),
    });
  }

  protected createLoadBalancer(securityGroup: vpc.SecurityGroup) {
    if (this.config.subnets.length < 2) {
      throw new Error(
        'At least two subnets in two different Availability Zones must be specified',
      );
    }
    return new elb.Alb(this, 'alb', {
      subnets: this.config.subnets.map((s) => s.id),
      enableCrossZoneLoadBalancing: false, // For Network load balancer only
      loadBalancerType: 'application',
      ipAddressType: 'dualstack',
      enableHttp2: true,
      securityGroups: [securityGroup.id],
      name: this.getResourceName('alb'),
      dependsOn: this.config.albDependencies,
    });
  }

  protected createTargetGroup() {
    return new elb.AlbTargetGroup(this, 'target', {
      port: 80,
      protocol: 'HTTP',
      targetType: 'ip',
      healthCheck: {
        healthyThreshold: 3,
        interval: 30,
        protocol: 'HTTP',
        matcher: '200',
        timeout: 3,
        path: '/ping', // Not configurable by traefik
        port: '8080',
        unhealthyThreshold: 2,
      },

      vpcId: this.config.vpc.id,
      name: this.getResourceName('target'),
    });
  }

  protected createHttpListeners(
    loadBalancer: elb.Alb,
    targetGroup: elb.AlbTargetGroup,
  ) {
    // Redirect all traffic from the ALB to the target group
    const httpsListener = new elb.AlbListener(this, 'https', {
      loadBalancerArn: loadBalancer.id,
      port: 443,
      protocol: 'HTTPS',
      sslPolicy: 'ELBSecurityPolicy-2016-08',
      certificateArn: this.config.certificate.arn,
      defaultAction: [
        {
          targetGroupArn: targetGroup.id,
          type: 'forward',
        },
      ],
    });
    // Create a listener for HTTP traffic that redirects to HTTPS
    const httpListener = new elb.AlbListener(this, 'http', {
      loadBalancerArn: loadBalancer.id,
      port: 80,
      protocol: 'HTTP',
      defaultAction: [
        {
          type: 'redirect',
          redirect: {
            port: '443',
            protocol: 'HTTPS',
            statusCode: 'HTTP_301',
          },
        },
      ],
    });

    return { httpsListener, httpListener };
  }

  protected routeTrafficToLoadBalancer(loadBalancer: elb.Alb) {
    // Create DNS record to route to ALB
    return new route53.Route53Record(this, 'record', {
      allowOverwrite: true,
      records: [loadBalancer.dnsName],
      ttl: 300,
      type: 'CNAME',
      zoneId: this.config.route53Zone.zoneId,
      name: this.config.subDomain,
    });
  }
}
