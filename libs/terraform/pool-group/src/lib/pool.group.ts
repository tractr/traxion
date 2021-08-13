import { ConstructOptions } from 'constructs';

import {
  AwsComponent,
  AwsComponentConstructor,
} from '../../abstracts/aws.component';
import { AwsProviderConstruct } from '../../abstracts/aws.interface';
import { HootsuiteGroup } from '../hootsuite/hootsuite.group';
import type { NetworkGroup } from '../network/network.group';
import { RegistryGroup } from '../registry/registry.group';
import type { ZoneGroup } from '../zone/zone.group';
import { poolConfig } from './config';
import { EcsComponent } from './ecs.component';
import { EntrypointComponent } from './entrypoint.component';
import { LogsComponent } from './logs.component';
import { OwnerPicturesComponent } from './owner-pictures/owner-pictures.component';
import { SecretsComponent } from './secrets/secrets.component';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
} from './services/backend-service.component';
import type {
  ServiceComponent,
  ServiceComponentConfig,
} from './services/service.component';

export interface PoolGroupConfig extends ConstructOptions {
  registryGroup: RegistryGroup;
  networkGroup: NetworkGroup;
  zoneGroup: ZoneGroup;
  hootsuiteGroup: HootsuiteGroup;
  subDomain: string;
  reverseProxyDesiredCount: number;
}

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
    config: Omit<PoolGroupConfig, 'subDomain' | 'reverseProxyDesiredCount'>,
  ) {
    super(scope, id, { ...poolConfig, ...config });
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
      additionalReadOnlyS3Arns: [
        this.config.hootsuiteGroup.getS3BucketArnAsToken(),
      ],
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
      reverseProxyDesiredCount: this.config.reverseProxyDesiredCount,
    });
  }

  addService<C extends ServiceComponent<O>, O extends ServiceComponentConfig>(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    additionalConfig?: Partial<O>,
  ): C {
    return this.ecsComponent.addService(ServiceClass, name, additionalConfig);
  }

  addBackendService<
    C extends BackendServiceComponent<O>,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    clients: ServiceComponent[],
    additionalConfig?: Partial<O>,
  ): C {
    return this.ecsComponent.addBackendService(
      ServiceClass,
      name,
      clients,
      additionalConfig,
    );
  }

  addHttpService<
    C extends BackendServiceComponent<O>,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    additionalConfig?: Partial<O>,
  ): C {
    return this.ecsComponent.addHttpService(
      ServiceClass,
      name,
      additionalConfig,
    );
  }

  protected getApplicationBaseUrl(): string {
    return `https://${
      this.config.subDomain
    }.${this.config.zoneGroup.getDomainName()}`;
  }
}
