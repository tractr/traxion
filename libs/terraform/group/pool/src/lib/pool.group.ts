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
} from '@tractr/terraform-component-aws';
import { EntrypointComponent } from '@tractr/terraform-component-entrypoint';
import { FileStorageComponent } from '@tractr/terraform-component-file-storage';
import { LogsComponent } from '@tractr/terraform-component-logs';
import { SecretsComponent } from '@tractr/terraform-component-secrets';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  ServiceComponent,
  ServiceComponentArtifacts,
  ServiceComponentConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-service-ecs';

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
      vpcId: this.config.networkGroup.artifacts.vpc.id,
      subnetsIds: this.config.networkGroup.artifacts.publicSubnets.map(
        (subnet) => subnet.id,
      ),
      certificateArn: this.config.zoneGroup.artifacts.acmCertificate.arn,
      route53ZoneId: this.config.zoneGroup.artifacts.route53Zone.id,
      subDomain: this.config.subDomain,
      albDependencies: [this.config.networkGroup.artifacts.internetGateway], // Hardcode some dependencies to avoid startup issues
    });
  }

  protected createFileStorage() {
    const { additionalReadOnlyS3Arns, s3PublicRead, s3AllowUpload } =
      this.config.fileStorageConfig;
    return new FileStorageComponent(this, 'files', {
      additionalReadOnlyS3Arns,
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
      vpcId: this.config.networkGroup.artifacts.vpc.id,
      subnetsIds: this.config.networkGroup.artifacts.privateSubnets.map(
        (subnet) => subnet.id,
      ),
      loadBalancerSecurityGroupId: entrypoint.artifacts.securityGroup.id,
      loadBalancerTargetGroupArn: entrypoint.artifacts.targetGroup.arn,
      secretsmanagerSecretArn: secrets.artifacts.secret.arn,
      fileStorageS3Endpoint:
        fileStorage.artifacts.bucket.bucketRegionalDomainName,
      fileStorageS3BucketName: fileStorage.artifacts.bucket.bucket,
      logsGroup: logs.artifacts.cloudwatchLogGroup.name,
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
