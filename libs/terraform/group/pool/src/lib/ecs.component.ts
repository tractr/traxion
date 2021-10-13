import { EcsCluster } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import { EcsComponentConfig } from './interfaces';

import {
  AwsComponent,
  AwsComponentConstructor,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';
import { PrivateDnsComponent } from '@tractr/terraform-component-private-dns';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  ExecutionRoleComponent,
  ServiceComponent,
  ServiceComponentConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-service-ecs';
import {
  ReverseProxyComponent,
  ReverseProxyTaskRoleComponent,
} from '@tractr/terraform-service-reverse-proxy';

export class EcsComponent extends AwsComponent<EcsComponentConfig> {
  protected readonly executionRoleComponent: ExecutionRoleComponent;

  protected readonly ecsCluster: EcsCluster;

  protected readonly serviceDiscoveryComponent: PrivateDnsComponent;

  protected readonly reverseProxyTaskRoleComponent: ReverseProxyTaskRoleComponent;

  protected readonly reverseProxyComponent: ReverseProxyComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: EcsComponentConfig,
  ) {
    super(scope, id, config);
    this.executionRoleComponent = this.createExecutionRoleComponent();
    this.ecsCluster = this.createEcsCluster();
    this.serviceDiscoveryComponent = this.createServiceDiscoveryComponent();

    // ReverseProxyTaskRoleComponent must be created before the proxy component
    this.reverseProxyTaskRoleComponent =
      this.createReverseProxyTaskRoleComponent();
    this.reverseProxyComponent = this.createReverseProxyComponent();
  }

  protected createExecutionRoleComponent() {
    return new ExecutionRoleComponent(this, 'exec', {
      secretsmanagerSecretArn: this.config.secretsmanagerSecretArn,
    });
  }

  protected createEcsCluster() {
    return new EcsCluster(this, 'cluster', {
      provider: this.provider,
      name: this.getResourceName('cluster'),
    });
  }

  protected createServiceDiscoveryComponent() {
    return new PrivateDnsComponent(this, 'discovery', {
      vpcId: this.config.vpcId,
    });
  }

  protected createReverseProxyTaskRoleComponent() {
    return new ReverseProxyTaskRoleComponent(this, 'proxy-task');
  }

  protected createReverseProxyComponent() {
    return new ReverseProxyComponent(this, 'proxy', {
      vpcId: this.config.vpcId,
      subnetsIds: this.config.subnetsIds,
      logsGroup: this.config.logsGroup,
      clusterId: this.getEcsClusterIdAsToken(),
      clusterName: this.getEcsClusterNameAsToken(),
      dockerApplications: this.config.dockerApplications,
      applicationBaseUrl: this.config.applicationBaseUrl,
      executionRoleArn: this.executionRoleComponent.getIamRoleArnAsToken(),
      secretsmanagerSecretArn: this.config.secretsmanagerSecretArn,
      fileStorageS3Endpoint: this.config.fileStorageS3Endpoint,
      fileStorageS3BucketName: this.config.fileStorageS3BucketName,
      privateDnsNamespaceId:
        this.serviceDiscoveryComponent.getNamespaceIdAsToken(),
      privateDnsNamespaceName:
        this.serviceDiscoveryComponent.getNamespaceNameAsToken(),
      loadBalancerSecurityGroupId: this.config.loadBalancerSecurityGroupId,
      loadBalancerTargetGroupArn: this.config.loadBalancerTargetGroupArn,
      taskRoleArn: this.reverseProxyTaskRoleComponent.getIamRoleArnAsToken(),
      ...this.config.reverseProxyConfig,
    });
  }

  /**
   * Append a service that don't need to be served via Http (through Traefik)
   */
  addService<
    C extends ServiceComponent<O>,
    P extends ServiceComponentPublicConfig,
    O extends ServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    publicConfig: P,
  ): C {
    const config = this.createServiceComponentConfig<P, O>(publicConfig);
    return new ServiceClass(this, name, config);
  }

  // Todo: improve typing, remove 'as never as O'
  protected createServiceComponentConfig<
    P extends ServiceComponentPublicConfig,
    O extends ServiceComponentConfig,
  >(publicConfig: P): O {
    return {
      vpcId: this.config.vpcId,
      subnetsIds: this.config.subnetsIds,
      logsGroup: this.config.logsGroup,
      clusterId: this.getEcsClusterIdAsToken(),
      clusterName: this.getEcsClusterNameAsToken(),
      dockerApplications: this.config.dockerApplications,
      applicationBaseUrl: this.config.applicationBaseUrl,
      executionRoleArn: this.executionRoleComponent.getIamRoleArnAsToken(),
      secretsmanagerSecretArn: this.config.secretsmanagerSecretArn,
      fileStorageS3Endpoint: this.config.fileStorageS3Endpoint,
      fileStorageS3BucketName: this.config.fileStorageS3BucketName,
      privateDnsNamespaceId:
        this.serviceDiscoveryComponent.getNamespaceIdAsToken(),
      privateDnsNamespaceName:
        this.serviceDiscoveryComponent.getNamespaceNameAsToken(),
      ...publicConfig,
    } as never as O;
  }

  /**
   * Append a service that will be served through reverse proxy (Traefik)
   */
  addHttpService<
    C extends BackendServiceComponent<O>,
    P extends ServiceComponentPublicConfig,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    publicConfig: P,
  ): C {
    const config = this.createBackendServiceComponentConfig<P, O>(
      [this.reverseProxyComponent],
      publicConfig,
    );
    return new ServiceClass(this, name, config);
  }

  /**
   * Append a service that will used by one or more services
   */
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
    const config = this.createBackendServiceComponentConfig<P, O>(
      clients,
      publicConfig,
    );
    return new ServiceClass(this, name, config);
  }

  protected createBackendServiceComponentConfig<
    P extends ServiceComponentPublicConfig,
    O extends BackendServiceComponentConfig,
  >(clients: ServiceComponent[], publicConfig: P): O {
    return {
      ...this.createServiceComponentConfig<P, O>(publicConfig),
      clientsSecurityGroupsIds: clients.map((client) =>
        client.getSecurityGroupIdAsToken(),
      ),
    };
  }

  getEcsClusterNameAsToken(): string {
    return Token.asString(this.ecsCluster.name);
  }

  getEcsClusterIdAsToken(): string {
    return Token.asString(this.ecsCluster.id);
  }
}
