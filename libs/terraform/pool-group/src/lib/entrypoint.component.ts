import {
  Alb,
  AlbListener,
  AlbTargetGroup,
  Route53Record,
  SecurityGroup,
} from '@cdktf/provider-aws';
import { ITerraformDependable, Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';

export interface EntrypointComponentConfig extends ConstructOptions {
  vpcId: string;
  certificateArn: string;
  subnetsIds: string[];
  route53ZoneId: string;
  subDomain: string;
  albDependencies?: ITerraformDependable[];
}

export class EntrypointComponent extends AwsComponent<EntrypointComponentConfig> {
  protected readonly securityGroup: SecurityGroup;

  protected readonly alb: Alb;

  protected readonly albTargetGroup: AlbTargetGroup;

  protected readonly httpsAlbListener: AlbListener;

  protected readonly httpAlbListener: AlbListener;

  protected readonly route53Record: Route53Record;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: EntrypointComponentConfig,
  ) {
    super(scope, id, config);
    this.securityGroup = this.createSecurityGroup();
    this.alb = this.createAlb();
    this.albTargetGroup = this.createAlbTargetGroup();
    this.httpsAlbListener = this.createHttpsAlbListener();
    this.httpAlbListener = this.createHttpAlbListener();
    this.route53Record = this.createRoute53Record();
  }

  protected createSecurityGroup() {
    return new SecurityGroup(this, 'sg', {
      provider: this.provider,
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
      vpcId: this.config.vpcId,
      name: this.getResourceName('sg'),
    });
  }

  protected createAlb() {
    if (this.config.subnetsIds.length < 2) {
      throw new Error(
        'At least two subnets in two different Availability Zones must be specified',
      );
    }
    return new Alb(this, 'alb', {
      provider: this.provider,
      subnets: this.config.subnetsIds,
      enableCrossZoneLoadBalancing: false, // For Network load balancer only
      loadBalancerType: 'application',
      ipAddressType: 'dualstack',
      enableHttp2: true,
      securityGroups: [this.getSecurityGroupIdAsToken()],
      name: this.getResourceName('alb'),
      dependsOn: this.config.albDependencies,
    });
  }

  protected createAlbTargetGroup() {
    return new AlbTargetGroup(this, 'target', {
      provider: this.provider,
      port: 80,
      protocol: 'HTTP',
      targetType: 'ip',
      healthCheck: [
        {
          healthyThreshold: 3,
          interval: 30,
          protocol: 'HTTP',
          matcher: '200',
          timeout: 3,
          path: '/ping', // Not configurable by traefik
          port: '8080',
          unhealthyThreshold: 2,
        },
      ],
      vpcId: this.config.vpcId,
      name: this.getResourceName('target'),
    });
  }

  protected createHttpsAlbListener() {
    // Redirect all traffic from the ALB to the target group
    return new AlbListener(this, 'https', {
      provider: this.provider,
      loadBalancerArn: this.getAlbIdAsToken(),
      port: 443,
      protocol: 'HTTPS',
      sslPolicy: 'ELBSecurityPolicy-2016-08',
      certificateArn: this.config.certificateArn,
      defaultAction: [
        {
          targetGroupArn: this.getAlbTargetGroupIdAsToken(),
          type: 'forward',
        },
      ],
    });
  }

  protected createHttpAlbListener() {
    // Redirect all HTTP traffic to HTTPS
    return new AlbListener(this, 'http', {
      provider: this.provider,
      loadBalancerArn: this.getAlbIdAsToken(),
      port: 80,
      protocol: 'HTTP',
      defaultAction: [
        {
          type: 'redirect',
          redirect: [
            {
              port: '443',
              protocol: 'HTTPS',
              statusCode: 'HTTP_301',
            },
          ],
        },
      ],
    });
  }

  protected createRoute53Record() {
    // Create DNS record to route to ALB
    return new Route53Record(this, 'record', {
      provider: this.provider,
      allowOverwrite: true,
      records: [this.getAlbDnsNameAsToken()],
      ttl: 300,
      type: 'CNAME',
      zoneId: this.config.route53ZoneId,
      name: this.config.subDomain,
    });
  }

  getAlbIdAsToken(): string {
    return Token.asString(this.alb.id);
  }

  getAlbDnsNameAsToken(): string {
    return Token.asString(this.alb.dnsName);
  }

  getAlbTargetGroupArnAsToken(): string {
    return Token.asString(this.albTargetGroup.arn);
  }

  getAlbTargetGroupIdAsToken(): string {
    return Token.asString(this.albTargetGroup.id);
  }

  getSecurityGroupIdAsToken(): string {
    return Token.asString(this.securityGroup.id);
  }
}
