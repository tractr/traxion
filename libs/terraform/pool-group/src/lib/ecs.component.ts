import { EcsCluster } from '@cdktf/provider-aws';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import { PrivateDnsComponent } from './private-dns/private-dns.component';
import { ReverseProxyTaskRoleComponent } from './reverse-proxy/reverse-proxy-task-role.component';
import { ReverseProxyComponent } from './reverse-proxy/reverse-proxy.component';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
} from './services/backend-service.component';
import { ExecutionRoleComponent } from './services/execution-role.component';
import type {
  ServiceComponent,
  ServiceComponentConfig,
} from './services/service.component';

import {
  AwsComponent,
  AwsComponentConstructor,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';
import type { DockerApplications } from '@tractr/terraform-registry-group';

export interface EcsComponentConfig extends ConstructOptions {
  subnetsIds: string[];
  loadBalancerSecurityGroupId: string;
  loadBalancerTargetGroupArn: string;
  secretsmanagerSecretArn: string;
  fileStorageS3Endpoint: string;
  fileStorageS3BucketName: string;
  logsGroup: string;
  vpcId: string;
  dockerApplications: DockerApplications;
  applicationBaseUrl: string;
  reverseProxyDesiredCount: number;
}

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
    this.reverseProxyTaskRoleComponent =
      this.createReverseProxyTaskRoleComponent();
    this.ecsCluster = this.createEcsCluster();
    this.serviceDiscoveryComponent = this.createServiceDiscoveryComponent();
    this.reverseProxyComponent = this.createReverseProxyComponent();
  }

  protected createExecutionRoleComponent() {
    return new ExecutionRoleComponent(this, 'exec', {
      secretsmanagerSecretArn: this.config.secretsmanagerSecretArn,
    });
  }

  protected createReverseProxyTaskRoleComponent() {
    return new ReverseProxyTaskRoleComponent(this, 'task');
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
      taskRoleArn: this.reverseProxyTaskRoleComponent.getIamRoleArnAsToken(),
      loadBalancerSecurityGroupId: this.config.loadBalancerSecurityGroupId,
      loadBalancerTargetGroupArn: this.config.loadBalancerTargetGroupArn,
      desiredCount: this.config.reverseProxyDesiredCount,
    });
  }

  /**
   * Append a service that don't need to be served via Http (through Traefik)
   */
  addService<C extends ServiceComponent<O>, O extends ServiceComponentConfig>(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    additionalConfig?: Partial<O>,
  ): C {
    const config = this.createServiceComponentConfig<O>(additionalConfig);
    return new ServiceClass(this, name, config);
  }

  // Todo: improve typing, remove 'as C'
  protected createServiceComponentConfig<O extends ServiceComponentConfig>(
    additionalConfig?: Partial<O>,
  ): O {
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
      ...additionalConfig,
    } as O;
  }

  /**
   * Append a service that will be served through reverse proxy (Traefik)
   */
  addHttpService<
    C extends BackendServiceComponent<O>,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    additionalConfig?: Partial<O>,
  ): C {
    const config = this.createBackendServiceComponentConfig<O>(
      [this.reverseProxyComponent],
      additionalConfig,
    );
    return new ServiceClass(this, name, config);
  }

  /**
   * Append a service that will used by one or more services
   */
  addBackendService<
    C extends BackendServiceComponent<O>,
    O extends BackendServiceComponentConfig,
  >(
    ServiceClass: AwsComponentConstructor<C, O>,
    name: string,
    clients: ServiceComponent[],
    additionalConfig?: Partial<O>,
  ): C {
    const config = this.createBackendServiceComponentConfig<O>(
      clients,
      additionalConfig,
    );
    return new ServiceClass(this, name, config);
  }

  // Todo: improve typing, remove 'as C'
  protected createBackendServiceComponentConfig<
    O extends BackendServiceComponentConfig,
  >(clients: ServiceComponent[], additionalConfig?: Partial<O>): O {
    return {
      ...this.createServiceComponentConfig(),
      ...additionalConfig,
      clientsSecurityGroupsIds: clients.map((client) =>
        client.getSecurityGroupIdAsToken(),
      ),
    } as O;
  }

  getEcsClusterNameAsToken(): string {
    return Token.asString(this.ecsCluster.name);
  }

  getEcsClusterIdAsToken(): string {
    return Token.asString(this.ecsCluster.id);
  }
}
