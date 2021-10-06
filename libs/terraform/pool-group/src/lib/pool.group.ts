import { POOL_GROUP_DEFAULT_CONFIG } from './configs';
import { EcsComponent } from './ecs.component';
import { PoolGroupConfig } from './interfaces';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
} from './services/backend-service.component';
import type {
  ServiceComponent,
  ServiceComponentConfig,
} from './services/service.component';
import { ServiceComponentPublicConfig } from './services/service.component';

import {
  AwsComponent,
  AwsComponentConstructor,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';
import { EntrypointComponent } from '@tractr/terraform-entrypoint-component';
import { LogsComponent } from '@tractr/terraform-logs-component';
import { OwnerPicturesComponent } from '@tractr/terraform-owner-pictures-component';
import { SecretsComponent } from '@tractr/terraform-secrets-component';

/**
 * Following https://medium.com/@bradford_hamilton/deploying-containers-on-amazons-ecs-using-fargate-and-terraform-part-2-2e6f6a3a957f
 */
export class PoolGroup extends AwsComponent<PoolGroupConfig> {
  protected readonly logsComponent: LogsComponent;

  protected readonly secretsComponent: SecretsComponent;

  protected readonly entrypointComponent: EntrypointComponent;

  protected readonly ownerPicturesComponent: OwnerPicturesComponent;

  protected readonly ecsComponent: EcsComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PoolGroupConfig,
  ) {
    super(scope, id, { ...POOL_GROUP_DEFAULT_CONFIG, ...config });
    this.logsComponent = this.createLogsComponent();
    this.secretsComponent = this.createSecretsComponent();
    this.entrypointComponent = this.createEntrypointComponent();
    this.ownerPicturesComponent = this.createOwnerPicturesComponent();
    this.ecsComponent = this.createEcsComponent();
  }

  protected createLogsComponent() {
    return new LogsComponent(this, 'logs');
  }

  protected createSecretsComponent() {
    return new SecretsComponent(this, 'secrets');
  }

  protected createEntrypointComponent() {
    return new EntrypointComponent(this, 'entry', {
      vpcId: this.config.networkGroup.getVpcIdAsToken(),
      subnetsIds: this.config.networkGroup.getPublicSubnetsIdsAsTokens(),
      certificateArn: this.config.zoneGroup.getAcmCertificateArnAsToken(),
      route53ZoneId: this.config.zoneGroup.getRoute53ZoneIdAsToken(),
      subDomain: this.config.subDomain,
      albDependencies: [this.config.networkGroup.getInternetGateway()], // Hardcode some dependencies to avoid startup issues
    });
  }

  protected createOwnerPicturesComponent() {
    return new OwnerPicturesComponent(this, 'owner-pictures', {
      additionalReadOnlyS3Arns: [],
    });
  }

  protected createEcsComponent() {
    return new EcsComponent(this, 'ecs', {
      vpcId: this.config.networkGroup.getVpcIdAsToken(),
      subnetsIds: this.config.networkGroup.getPrivateSubnetsIdsAsTokens(),
      loadBalancerSecurityGroupId:
        this.entrypointComponent.getSecurityGroupIdAsToken(),
      loadBalancerTargetGroupArn:
        this.entrypointComponent.getAlbTargetGroupArnAsToken(),
      secretsmanagerSecretArn:
        this.secretsComponent.getSecretsmanagerSecretArnAsToken(),
      fileStorageS3Endpoint:
        this.ownerPicturesComponent.getS3BucketDomainName(),
      fileStorageS3BucketName: this.ownerPicturesComponent.getS3BucketName(),
      logsGroup: this.logsComponent.getCloudwatchLogGroupName(),
      dockerApplications: this.config.registryGroup.getDockerApplications(),
      applicationBaseUrl: this.getApplicationBaseUrl(),
      reverseProxyConfig: this.config.reverseProxy,
    });
  }

  addService<
    C extends ServiceComponent<O>,
    P extends ServiceComponentPublicConfig,
    O extends ServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    publicConfig: P,
  ): C {
    return this.ecsComponent.addService(ServiceClass, name, publicConfig);
  }

  addBackendService<
    C extends BackendServiceComponent<O>,
    P extends ServiceComponentPublicConfig,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    clients: ServiceComponent[],
    publicConfig: P,
  ): C {
    return this.ecsComponent.addBackendService(
      ServiceClass,
      name,
      clients,
      publicConfig,
    );
  }

  addHttpService<
    C extends BackendServiceComponent<O>,
    P extends ServiceComponentPublicConfig,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    publicConfig: P,
  ): C {
    return this.ecsComponent.addHttpService(ServiceClass, name, publicConfig);
  }

  protected getApplicationBaseUrl(): string {
    return `https://${
      this.config.subDomain
    }.${this.config.zoneGroup.getDomainName()}`;
  }
}
