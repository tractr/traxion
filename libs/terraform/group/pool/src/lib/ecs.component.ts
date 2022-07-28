import { ecs } from '@cdktf/provider-aws';

import { EcsComponentArtifacts, EcsComponentConfig } from './interfaces';

import {
  AwsComponent,
  AwsComponentConstructor,
} from '@tractr/terraform-component-aws';
import { PrivateDnsComponent } from '@tractr/terraform-component-private-dns';
import {
  BackendServiceComponent,
  BackendServiceComponentConfig,
  ExecutionRoleComponent,
  OtherObject,
  ServiceComponent,
  ServiceComponentArtifacts,
  ServiceComponentConfig,
  ServiceComponentDefaultConfig,
  ServiceComponentPublicConfig,
} from '@tractr/terraform-service-ecs';
import {
  ReverseProxyComponent,
  ReverseProxyTaskRoleComponent,
} from '@tractr/terraform-service-reverse-proxy';

export class EcsComponent extends AwsComponent<
  EcsComponentConfig,
  EcsComponentArtifacts
> {
  protected createComponents(): void {
    const executionRole = this.createExecutionRole();
    const ecsCluster = this.createEcsCluster();
    const privateDns = this.createPrivateDns();

    // ReverseProxyTaskRoleComponent must be created before the proxy component
    const reverseProxyTaskRole = this.createReverseProxyTaskRole();
    const reverseProxy = this.createReverseProxyComponent(
      ecsCluster,
      executionRole,
      reverseProxyTaskRole,
      privateDns,
    );

    // Populate artifacts
    this.artifacts = {
      ecsCluster,
      executionRole,
      privateDns,
      reverseProxy,
      reverseProxyTaskRole,
    };
  }

  protected createExecutionRole() {
    return new ExecutionRoleComponent(this, 'exec', {
      secret: this.config.secret,
    });
  }

  protected createEcsCluster() {
    return new ecs.EcsCluster(this, 'cluster', {
      name: this.getResourceName('cluster'),
    });
  }

  protected createPrivateDns() {
    return new PrivateDnsComponent(this, 'discovery', {
      vpc: this.config.vpc,
    });
  }

  protected createReverseProxyTaskRole() {
    return new ReverseProxyTaskRoleComponent(this, 'proxy-task', {});
  }

  protected createReverseProxyComponent(
    ecsCluster: ecs.EcsCluster,
    executionRole: ExecutionRoleComponent,
    taskRole: ReverseProxyTaskRoleComponent,
    privateDns: PrivateDnsComponent,
  ) {
    return new ReverseProxyComponent(this, 'proxy', {
      vpc: this.config.vpc,
      subnets: this.config.subnets,
      logsGroup: this.config.logsGroup,
      cluster: ecsCluster,
      dockerApplications: this.config.dockerApplications,
      applicationBaseUrl: this.config.applicationBaseUrl,
      executionRole: executionRole.artifacts.role,
      secret: this.config.secret,
      privateDnsNamespace: privateDns.artifacts.dnsNamespace,
      loadBalancerSecurityGroup: this.config.loadBalancerSecurityGroup,
      loadBalancerTargetGroup: this.config.loadBalancerTargetGroup,
      taskRole: taskRole.artifacts.role,
      ...this.config.reverseProxyConfig,
    });
  }

  /**
   * Append a service that don't need to be served via Http (through Traefik)
   */
  addService<
    T extends OtherObject,
    Component extends ServiceComponent<
      ServiceComponentConfig & T,
      DefaultConfig,
      Artifacts
    >,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
  >(
    ServiceClass: AwsComponentConstructor<
      Component,
      ServiceComponentConfig & T,
      Artifacts
    >,
    name: string,
    publicConfig: ServiceComponentPublicConfig & T,
  ): Component {
    const config = this.createServiceComponentConfig(publicConfig);
    return new ServiceClass(this, name, config);
  }

  // Todo: improve typing, remove 'as never as Config'
  protected createServiceComponentConfig<T extends OtherObject>(
    publicConfig: ServiceComponentPublicConfig & T,
  ): ServiceComponentConfig & T {
    return {
      vpc: this.config.vpc,
      subnets: this.config.subnets,
      logsGroup: this.config.logsGroup,
      cluster: this.artifacts.ecsCluster,
      dockerApplications: this.config.dockerApplications,
      applicationBaseUrl: this.config.applicationBaseUrl,
      executionRole: this.artifacts.executionRole.artifacts.role,
      secret: this.config.secret,
      privateDnsNamespace: this.artifacts.privateDns.artifacts.dnsNamespace,
      ...publicConfig,
    };
  }

  /**
   * Append a service that will be served through reverse proxy (Traefik)
   */
  addHttpService<
    T extends OtherObject,
    Component extends BackendServiceComponent<
      BackendServiceComponentConfig & T,
      DefaultConfig,
      Artifacts
    >,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
  >(
    ServiceClass: AwsComponentConstructor<
      Component,
      BackendServiceComponentConfig & T,
      Artifacts
    >,
    name: string,
    publicConfig: ServiceComponentPublicConfig & T,
  ): Component {
    const config = this.createBackendServiceComponentConfig(
      [this.artifacts.reverseProxy],
      publicConfig,
    );
    return new ServiceClass(this, name, config);
  }

  /**
   * Append a service that will used by one or more services
   */
  addBackendService<
    T extends OtherObject,
    Component extends BackendServiceComponent<
      BackendServiceComponentConfig & T,
      DefaultConfig,
      Artifacts
    >,
    DefaultConfig extends ServiceComponentDefaultConfig,
    Artifacts extends ServiceComponentArtifacts,
  >(
    ServiceClass: AwsComponentConstructor<
      Component,
      BackendServiceComponentConfig & T,
      Artifacts
    >,
    name: string,
    clients: ServiceComponent[],
    publicConfig: ServiceComponentPublicConfig & T,
  ): Component {
    const config = this.createBackendServiceComponentConfig(
      clients,
      publicConfig,
    );
    return new ServiceClass(this, name, config);
  }

  protected createBackendServiceComponentConfig<T extends OtherObject>(
    clients: ServiceComponent[],
    publicConfig: ServiceComponentPublicConfig & T,
  ): BackendServiceComponentConfig & T {
    return {
      ...this.createServiceComponentConfig(publicConfig),
      clientsSecurityGroups: clients.map(
        (client) => client.artifacts.securityGroup,
      ),
    };
  }
}
