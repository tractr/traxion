import {
  EcsService,
  EcsServiceConfig,
  EcsTaskDefinition,
  EcsTaskDefinitionConfig,
  EcsTaskDefinitionVolume,
  SecurityGroup,
  SecurityGroupConfig,
  ServiceDiscoveryService,
  ServiceDiscoveryServiceConfig,
} from '@cdktf/provider-aws';
import { kebab } from 'case';
import { Token } from 'cdktf';
import { ConstructOptions } from 'constructs';

import { Container } from '../containers/container';


import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-aws-component';
import {
  DeploymentComponent,
  DeploymentComponentConfig,
} from '@tractr/terraform-deployment-component';
import {
  DockerApplication,
  DockerApplications,
} from '@tractr/terraform-registry-group';
import {
  VolumeComponent,
  VolumeComponentConfig,
} from '@tractr/terraform-volume-component';

// Check cpu/memory pairs: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html
export type CpuValue = '256' | '512' | '1024' | '2048' | '4096';
export type MemoryValue =
  | '512'
  | '1024'
  | '2048'
  | '3072'
  | '4096'
  | '5120'
  | '6144'
  | '7168'
  | '8192'
  | '16384'
  | '30720';

export interface ServiceComponentPrivateConfig extends ConstructOptions {
  vpcId: string;
  subnetsIds: string[];
  logsGroup: string;
  clusterId: string;
  clusterName: string;
  dockerApplications: DockerApplications;
  applicationBaseUrl: string;
  executionRoleArn: string;
  secretsmanagerSecretArn: string;
  fileStorageS3Endpoint: string;
  fileStorageS3BucketName: string;
  privateDnsNamespaceId: string;
  privateDnsNamespaceName: string;
}

export interface ServiceComponentPublicConfig extends ConstructOptions {
  cpu: CpuValue;
  memory: MemoryValue;
  desiredCount: number;
}

export type ServiceComponentConfig = ServiceComponentPrivateConfig &
  ServiceComponentPublicConfig;

export abstract class ServiceComponent<
  T extends ServiceComponentConfig = ServiceComponentConfig,
> extends AwsComponent<T> {
  protected readonly serviceName: string;

  protected readonly securityGroup: SecurityGroup;

  protected readonly ecsTaskDefinition: EcsTaskDefinition;

  protected readonly serviceDiscoveryService: ServiceDiscoveryService;

  protected readonly ecsService: EcsService;

  protected readonly deploymentComponent: DeploymentComponent | undefined;

  protected readonly containers: Container[];

  protected readonly volumesNames: string[];

  protected readonly volumeComponentsMap:
    | Record<string, VolumeComponent>
    | undefined;

  constructor(scope: AwsProviderConstruct, id: string, config: T) {
    super(scope, id, config);
    this.serviceName = kebab(id);
    this.containers = this.getContainers();
    this.volumesNames = this.getVolumesNames();
    this.securityGroup = this.createSecurityGroup();
    if (this.shouldCreateVolumeComponent()) {
      this.volumeComponentsMap = this.createVolumeComponentsMap();
    }
    this.ecsTaskDefinition = this.createEcsTaskDefinition();
    this.serviceDiscoveryService = this.createServiceDiscoveryService();
    this.ecsService = this.createEcsService();
    if (this.enableContinuousDeployment()) {
      this.deploymentComponent = this.createDeploymentComponent();
    }
  }

  protected createSecurityGroup() {
    return new SecurityGroup(this, 'sg', this.getSecurityGroupConfig());
  }

  protected getSecurityGroupConfig(): SecurityGroupConfig {
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
    return new EcsTaskDefinition(
      this,
      'task',
      this.getEcsTaskDefinitionConfig(),
    );
  }

  protected getEcsTaskDefinitionConfig(): EcsTaskDefinitionConfig {
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

  protected createServiceDiscoveryService() {
    return new ServiceDiscoveryService(
      this,
      'discovery',
      this.getServiceDiscoveryServiceConfig(),
    );
  }

  protected getServiceDiscoveryServiceConfig(): ServiceDiscoveryServiceConfig {
    return {
      name: this.serviceName,
      dnsConfig: [
        {
          namespaceId: this.config.privateDnsNamespaceId,
          routingPolicy: 'MULTIVALUE',
          dnsRecords: [
            {
              type: 'A',
              ttl: 5,
            },
          ],
        },
      ],
    };
  }

  protected createEcsService() {
    return new EcsService(this, 'service', this.getEcsServiceConfig());
  }

  protected getEcsServiceConfig(): EcsServiceConfig {
    return {
      provider: this.provider,
      cluster: this.config.clusterId,
      taskDefinition: this.getEcsTaskDefinitionArnAsToken(),
      launchType: 'FARGATE',
      schedulingStrategy: 'REPLICA',
      desiredCount: this.config.desiredCount || 1,
      networkConfiguration: [
        {
          securityGroups: [this.getSecurityGroupIdAsToken()],
          subnets: this.config.subnetsIds,
          assignPublicIp: true,
        },
      ],
      serviceRegistries: [
        {
          registryArn: this.getServiceDiscoveryServiceArnAsToken(),
        },
      ],
      name: this.getResourceName('service'),
      lifecycle: {
        ignoreChanges: ['desired_count', 'task_definition'],
      },
    };
  }

  protected getVolumesNames(): string[] {
    const volumes = new Set<string>();
    this.containers.forEach((container) => {
      container.getMountPoints().forEach((mountPoint) => {
        volumes.add(mountPoint.sourceVolume);
      });
    });
    return [...volumes];
  }

  protected shouldCreateVolumeComponent() {
    return this.volumesNames.length > 0;
  }

  protected createVolumeComponentsMap() {
    return this.volumesNames.reduce(
      (map, name) => ({
        ...map,
        [name]: this.createVolumeComponent(name),
      }),
      {} as Record<string, VolumeComponent>,
    );
  }

  protected createVolumeComponent(name: string) {
    return new VolumeComponent(this, name, this.getVolumeComponentConfig());
  }

  protected getVolumeComponentConfig(): VolumeComponentConfig {
    return {
      vpcId: this.config.vpcId,
      subnetsIds: this.config.subnetsIds,
      clientsSecurityGroupsIds: [this.getSecurityGroupIdAsToken()],
    };
  }

  protected getVolumesForTaskDefinition(): EcsTaskDefinitionVolume[] {
    if (!this.volumeComponentsMap) {
      return [];
    }
    return Object.entries(this.volumeComponentsMap).map(
      ([name, volumeComponent]) => ({
        name,
        efsVolumeConfiguration: [
          {
            fileSystemId: volumeComponent.getFileSystemIdAsToken(),
          },
        ],
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
    return this.provider.region;
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
