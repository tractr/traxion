import { POOL_GROUP_DEFAULT_CONFIG } from './configs';
import { EcsComponent } from './ecs.component';
import {
  PoolGroupArtifacts,
  PoolGroupConfig,
  PoolGroupDefaultConfig,
} from './interfaces';

import {
  AwsComponent,
  AwsComponentConstructor,
  AwsProviderConstruct,
  mergeConfigurations,
} from '@trxn/terraform-component-aws';
import { EntrypointComponent } from '@trxn/terraform-component-entrypoint';
import { FileStorageComponent } from '@trxn/terraform-component-file-storage';
import { LogsComponent } from '@trxn/terraform-component-logs';
import { SecretsComponent } from '@trxn/terraform-component-secrets';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  ServiceComponent,
  ServiceComponentArtifacts,
  ServiceComponentConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentPublicConfig,
} from '@trxn/terraform-service-ecs';

/**
 * Following https://medium.com/@bradford_hamilton/deploying-containers-on-amazons-ecs-using-fargate-and-terraform-part-2-2e6f6a3a957f
 */
export class PoolGroup extends AwsComponent<
  PoolGroupConfig & PoolGroupDefaultConfig,
  PoolGroupArtifacts
> {
  /**
   * Merge config and default config
   */
  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: PoolGroupConfig,
  ) {
    super(scope, id, mergeConfigurations(POOL_GROUP_DEFAULT_CONFIG, config));
  }

  protected createComponents(): void {
    const logs = this.createLogs();
    const secrets = this.createSecrets();
    const entrypoint = this.createEntrypoint();
    const fileStorage = this.createFileStorage();
    const ecs = this.createEcs(entrypoint, secrets, fileStorage, logs);

    // Populate artifacts
    this.artifacts = {
      logs,
      secrets,
      entrypoint,
      fileStorage,
      ecs,
    };
  }

  protected createLogs() {
    return new LogsComponent(this, 'logs', {});
  }

  protected createSecrets() {
    return new SecretsComponent(this, 'secrets', {});
  }

  protected createEntrypoint() {
    return new EntrypointComponent(this, 'entry', {
      vpc: this.config.networkGroup.artifacts.vpc,
      subnets: this.config.networkGroup.artifacts.publicSubnets,
      certificate: this.config.zoneGroup.artifacts.acmCertificate,
      route53Zone: this.config.zoneGroup.artifacts.route53Zone,
      subDomain: this.config.subDomain,
      albDependencies: [this.config.networkGroup.artifacts.internetGateway], // Hardcode some dependencies to avoid startup issues
    });
  }

  protected createFileStorage() {
    const { additionalReadOnlyS3Buckets, s3PublicRead, s3AllowUpload } =
      this.config.fileStorageConfig;
    return new FileStorageComponent(this, 'files', {
      additionalReadOnlyS3Buckets,
      s3PublicRead,
      s3AllowUpload: s3AllowUpload
        ? { origins: [this.getApplicationBaseUrl()] }
        : undefined,
    });
  }

  protected createEcs(
    entrypoint: EntrypointComponent,
    secrets: SecretsComponent,
    fileStorage: FileStorageComponent,
    logs: LogsComponent,
  ) {
    return new EcsComponent(this, 'ecs', {
      vpc: this.config.networkGroup.artifacts.vpc,
      subnets: this.config.networkGroup.artifacts.privateSubnets,
      loadBalancerSecurityGroup: entrypoint.artifacts.securityGroup,
      loadBalancerTargetGroup: entrypoint.artifacts.targetGroup,
      secret: secrets.artifacts.secret,
      logsGroup: logs.artifacts.cloudwatchLogGroup,
      dockerApplications: this.config.registryGroup.artifacts.applicationsMap,
      applicationBaseUrl: this.getApplicationBaseUrl(),
      reverseProxyConfig: this.config.reverseProxyConfig,
    });
  }

  addService<
    Component extends ServiceComponent<Config, DefaultConfig, Artifacts>,
    Config extends ServiceComponentConfig,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
    PublicConfig extends ServiceComponentPublicConfig,
  >(
    ServiceClass: AwsComponentConstructor<Component, Config, Artifacts>,
    name: string,
    publicConfig: PublicConfig,
  ): Component {
    return this.artifacts.ecs.addService(ServiceClass, name, publicConfig);
  }

  addBackendService<
    Component extends BackendServiceComponent<Config, DefaultConfig, Artifacts>,
    Config extends BackendServiceComponentConfig,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
    PublicConfig extends ServiceComponentPublicConfig,
  >(
    ServiceClass: AwsComponentConstructor<Component, Config, Artifacts>,
    name: string,
    clients: ServiceComponent[],
    publicConfig: PublicConfig,
  ): Component {
    return this.artifacts.ecs.addBackendService(
      ServiceClass,
      name,
      clients,
      publicConfig,
    );
  }

  addHttpService<
    Component extends BackendServiceComponent<Config, DefaultConfig, Artifacts>,
    Config extends BackendServiceComponentConfig,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
    PublicConfig extends ServiceComponentPublicConfig,
  >(
    ServiceClass: AwsComponentConstructor<Component, Config, Artifacts>,
    name: string,
    publicConfig: PublicConfig,
  ): Component {
    return this.artifacts.ecs.addHttpService(ServiceClass, name, publicConfig);
  }

  protected getApplicationBaseUrl(): string {
    return `https://${this.config.subDomain}.${this.config.zoneGroup.artifacts.domainName}`;
  }
}
