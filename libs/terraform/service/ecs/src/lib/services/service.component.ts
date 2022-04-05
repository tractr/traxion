import { ecs, servicediscovery, vpc } from '@cdktf/provider-aws';
import { kebab } from 'case';
import { Token } from 'cdktf';
import * as deepmerge from 'deepmerge';

import { Container } from '../containers';
import {
  ServiceComponentConfig,
  ServiceComponentDefaultConfig,
  VolumesConfig,
  VolumesConfigs,
} from '../interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';
import {
  DeploymentComponent,
  DeploymentComponentConfig,
} from '@tractr/terraform-component-deployment';
import {
  VolumeComponent,
  VolumeComponentConfig,
} from '@tractr/terraform-component-volume';
import { DockerApplication } from '@tractr/terraform-group-registry';

export abstract class ServiceComponent<
  C extends ServiceComponentConfig = ServiceComponentConfig,
  D extends ServiceComponentDefaultConfig = ServiceComponentDefaultConfig,
> extends AwsComponent<C & D> {
  protected readonly config: C & D;

  protected readonly serviceName: string;

  protected readonly securityGroup: vpc.SecurityGroup;

  protected readonly ecsTaskDefinition: ecs.EcsTaskDefinition;

  /** This is used to get currently deployed task definition */
  protected readonly ecsTaskDefinitionData: ecs.DataAwsEcsTaskDefinition;

  protected readonly serviceDiscoveryService: servicediscovery.ServiceDiscoveryService;

  protected readonly ecsService: ecs.EcsService;

  protected readonly deploymentComponent: DeploymentComponent | undefined;

  protected readonly containers: Container[];

  protected readonly volumesConfigs: VolumesConfigs;

  protected readonly volumeComponentsMap:
    | Record<string, VolumeComponent>
    | undefined;

  constructor(scope: AwsProviderConstruct, id: string, config: C) {
    // Force partial config
    super(scope, id, config as C & D);
    // Define service name
    this.serviceName = kebab(id);
    // Re-assign full config
    this.config = deepmerge(this.getDefaultConfig(), config) as C & D;

    this.containers = this.getContainers();
    this.volumesConfigs = this.getVolumesConfigs();
    this.securityGroup = this.createSecurityGroup();
    if (this.shouldCreateVolumeComponent()) {
      this.volumeComponentsMap = this.createVolumeComponentsMap();
    }
    this.ecsTaskDefinition = this.createEcsTaskDefinition();
    this.ecsTaskDefinitionData = this.getEcsTaskDefinitionData();
    this.serviceDiscoveryService = this.createServiceDiscoveryService();
    this.ecsService = this.createEcsService();
    if (this.enableContinuousDeployment()) {
      this.deploymentComponent = this.createDeploymentComponent();
    }
  }

  protected getDefaultConfig(): ServiceComponentDefaultConfig {
    return {
      desiredCount: 1,
      cpu: '256',
      memory: '512',
    };
  }

  protected createSecurityGroup() {
    return new vpc.SecurityGroup(this, 'sg', this.getSecurityGroupConfig());
  }

  protected getSecurityGroupConfig(): vpc.SecurityGroupConfig {
    return {
      provider: this.provider,
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
    };
  }

  protected createEcsTaskDefinition() {
    return new ecs.EcsTaskDefinition(
      this,
      'task',
      this.getEcsTaskDefinitionConfig(),
    );
  }

  protected getEcsTaskDefinitionConfig(): ecs.EcsTaskDefinitionConfig {
    return {
      provider: this.provider,
      networkMode: 'awsvpc',
      requiresCompatibilities: ['FARGATE'],
      cpu: this.config.cpu,
      memory: this.config.memory,
      containerDefinitions: JSON.stringify(
        this.containers.map((c) => c.getDefinition()),
      ),
      volume: this.getVolumesForTaskDefinition(),
      executionRoleArn: this.config.executionRoleArn,
      family: this.getResourceName('task'),
      tags: this.getResourceNameAsTag('task'),
    };
  }

  /**
   * Get information about current task definition
   * Retrieve the task definition from the ECS service and return it as a data source
   */
  protected getEcsTaskDefinitionData(): ecs.DataAwsEcsTaskDefinition {
    const currentService = new ecs.DataAwsEcsService(this, 'current-service', {
      serviceName: this.getResourceName('service'),
      clusterArn: this.config.clusterId, // Works with id
    });
    return new ecs.DataAwsEcsTaskDefinition(this, 'current-task', {
      taskDefinition: currentService.taskDefinition,
    });
  }

  protected createServiceDiscoveryService() {
    return new servicediscovery.ServiceDiscoveryService(
      this,
      'discovery',
      this.getServiceDiscoveryServiceConfig(),
    );
  }

  protected getServiceDiscoveryServiceConfig(): servicediscovery.ServiceDiscoveryServiceConfig {
    return {
      name: this.serviceName,
      dnsConfig: {
        namespaceId: this.config.privateDnsNamespaceId,
        routingPolicy: 'MULTIVALUE',
        dnsRecords: [
          {
            type: 'A',
            ttl: 5,
          },
        ],
      },
    };
  }

  protected createEcsService() {
    return new ecs.EcsService(this, 'service', this.getEcsServiceConfig());
  }

  protected getEcsServiceConfig(): ecs.EcsServiceConfig {
    return {
      provider: this.provider,
      cluster: this.config.clusterId,
      taskDefinition: this.getMostRecentTaskDefinition(),
      launchType: 'FARGATE',
      schedulingStrategy: 'REPLICA',
      desiredCount: this.config.desiredCount || 1,
      networkConfiguration: {
        securityGroups: [this.getSecurityGroupIdAsToken()],
        subnets: this.config.subnetsIds,
        assignPublicIp: true,
      },

      serviceRegistries: {
        registryArn: this.getServiceDiscoveryServiceArnAsToken(),
      },

      name: this.getResourceName('service'),
    };
  }

  /**
   * Aggregate and group all mounts points across every container and merge boolean properties
   * @protected
   */
  protected getVolumesConfigs(): VolumesConfigs {
    const volumes: VolumesConfigs = {};
    for (const container of this.containers) {
      const mountPoints = container.getMountPoints();
      for (const mountPoint of mountPoints) {
        const name = mountPoint.sourceVolume;
        const previous: VolumesConfig = volumes[name]
          ? volumes[name]
          : {
              containers: [],
              preventDestroy: false,
              enableBackups: false,
            };

        volumes[name] = {
          containers: [...previous.containers, container],
          preventDestroy: mountPoint.preventDestroy || previous.preventDestroy,
          enableBackups: mountPoint.enableBackups || previous.enableBackups,
        };
      }
    }
    return volumes;
  }

  protected shouldCreateVolumeComponent() {
    return Object.keys(this.volumesConfigs).length > 0;
  }

  protected createVolumeComponentsMap() {
    return Object.entries(this.volumesConfigs).reduce(
      (map, [name, config]) => ({
        ...map,
        [name]: this.createVolumeComponent(name, config),
      }),
      {} as Record<string, VolumeComponent>,
    );
  }

  protected createVolumeComponent(name: string, config: VolumesConfig) {
    return new VolumeComponent(
      this,
      name,
      this.getVolumeComponentConfig(config),
    );
  }

  protected getVolumeComponentConfig(
    config: VolumesConfig,
  ): VolumeComponentConfig {
    return {
      vpcId: this.config.vpcId,
      subnetsIds: this.config.subnetsIds,
      clientsSecurityGroupsIds: [this.getSecurityGroupIdAsToken()],
      preventDestroy: config.preventDestroy,
      enableBackups: config.enableBackups,
    };
  }

  protected getVolumesForTaskDefinition(): ecs.EcsTaskDefinitionVolume[] {
    if (!this.volumeComponentsMap) {
      return [];
    }
    return Object.entries(this.volumeComponentsMap).map(
      ([name, volumeComponent]) => ({
        name,
        efsVolumeConfiguration: {
          fileSystemId: volumeComponent.getFileSystemIdAsToken(),
          rootDirectory: '/',
        },
      }),
    );
  }

  /**
   * If the services use one or more custom Docker images, it should use a continuous deployment.
   * If true, this will create a Code Pipeline to deploy automatically new image versions
   */
  protected enableContinuousDeployment(): boolean {
    return this.getPrivateContainers().length > 0;
  }

  protected createDeploymentComponent() {
    return new DeploymentComponent(
      this,
      'deploy',
      this.getDeploymentComponentConfig(),
    );
  }

  protected getDeploymentComponentConfig(): DeploymentComponentConfig {
    const privateContainers = this.getPrivateContainers();
    if (privateContainers.length === 0) {
      throw new Error(
        'Cannot get deployment config without private containers',
      );
    }

    return {
      triggers: privateContainers.map((pc) => ({
        imageTag: pc.getImageTag(),
        repositoryName: pc.getImageName(),
      })),
      imageDefinitions: JSON.stringify(
        this.containers.map((c) => c.getImageDefinition()),
      ),
      clusterName: this.config.clusterName,
      serviceName: this.getEcsServiceNameAsToken(),
    };
  }

  protected getPrivateContainers(): Container[] {
    return this.containers.filter((container) => container.usePrivateImage());
  }

  protected abstract getContainers(): Container[];

  getEcsTaskDefinitionArnAsToken(): string {
    return Token.asString(this.ecsTaskDefinition.arn);
  }

  getMostRecentTaskDefinition(): string {
    const family = Token.asString(this.ecsTaskDefinition.family);
    const newRevision = Token.asString(this.ecsTaskDefinition.revision);
    const currentRevision = Token.asString(this.ecsTaskDefinitionData.revision);
    return `${family}:\${max("${newRevision}", "${currentRevision}")}`;
  }

  getSecretsmanagerSecretArn(): string {
    return this.config.secretsmanagerSecretArn;
  }

  getFileStorageS3Endpoint(): string {
    return this.config.fileStorageS3Endpoint;
  }

  getFileStorageS3BucketName(): string {
    return this.config.fileStorageS3BucketName;
  }

  getEcsServiceNameAsToken(): string {
    return Token.asString(this.ecsService.name);
  }

  getSecurityGroupIdAsToken(): string {
    return Token.asString(this.securityGroup.id);
  }

  getLogsGroup(): string {
    return this.config.logsGroup;
  }

  getRegion(): string {
    return this.provider.region || '';
  }

  getServiceDiscoveryServiceArnAsToken(): string {
    return Token.asString(this.serviceDiscoveryService.arn);
  }

  getServiceDomainName(service: string): string {
    return `${service}.${this.config.privateDnsNamespaceName}`;
  }

  getApplicationUrl(path = ''): string {
    return `${this.config.applicationBaseUrl}${path}`;
  }

  getDockerApplication(appName: string): DockerApplication {
    if (!this.config.dockerApplications[appName]) {
      throw new Error(`No Docker application found for ${appName}`);
    }
    return this.config.dockerApplications[appName];
  }
}
