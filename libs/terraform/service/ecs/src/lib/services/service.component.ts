import { ecs, servicediscovery, vpc } from '@cdktf/provider-aws';
import { kebab } from 'case';
import { Token } from 'cdktf';

import { Container } from '../containers';
import {
  ServiceComponentArtifacts,
  ServiceComponentConfig,
  ServiceComponentDefaultConfig,
  VolumeComponents,
  VolumeConfig,
  VolumeConfigs,
} from '../interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
  mergeConfigurations,
} from '@tractr/terraform-component-aws';
import { DeploymentComponent } from '@tractr/terraform-component-deployment';
import { VolumeComponent } from '@tractr/terraform-component-volume';
import { DockerApplication } from '@tractr/terraform-group-registry';

export abstract class ServiceComponent<
  Config extends ServiceComponentConfig = ServiceComponentConfig,
  DefaultConfig extends ServiceComponentDefaultConfig = ServiceComponentDefaultConfig,
  Artifacts extends ServiceComponentArtifacts = ServiceComponentArtifacts,
> extends AwsComponent<Config & DefaultConfig, Artifacts> {
  /**
   * Force the constructor to be redefined in subclasses and receive the default config
   */
  protected constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: Config,
    defaultConfig: DefaultConfig,
  ) {
    super(scope, id, mergeConfigurations(defaultConfig, config));
  }

  protected abstract getContainers(): Container[];

  protected createComponents() {
    const containers = this.getContainers();
    const securityGroup = this.createSecurityGroup();
    const volumes = this.createVolumeComponents(containers, securityGroup);
    const taskDefinition = this.createTaskDefinition(containers, volumes);
    const discoveryService = this.createDiscoveryService();
    const ecsService = this.createEcsService(
      securityGroup,
      taskDefinition,
      discoveryService,
    );
    const deployment = this.createDeployment(ecsService, containers);

    // Populate artifacts
    this.artifacts = {
      containers,
      securityGroup,
      volumes,
      taskDefinition,
      discoveryService,
      ecsService,
      deployment,
    } as Artifacts; // Force type. Should be overridden by subclasses
  }

  /**
   * Create a service name from the component id
   */
  protected getServiceName(): string {
    return kebab(this.id);
  }

  protected createSecurityGroup() {
    return new vpc.SecurityGroup(this, 'sg', this.getSecurityGroupConfig());
  }

  /**
   * Dissociated config method for createSecurityGroup.
   * Allows to override default config.
   */
  protected getSecurityGroupConfig(): vpc.SecurityGroupConfig {
    return {
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

  protected createTaskDefinition(
    containers: Container[],
    volumes: VolumeComponents,
  ) {
    return new ecs.EcsTaskDefinition(
      this,
      'task',
      this.getEcsTaskDefinitionConfig(containers, volumes),
    );
  }

  /**
   * Dissociated config method for createEcsTaskDefinition.
   * Allows to override default config.
   */
  protected getEcsTaskDefinitionConfig(
    containers: Container[],
    volumes: VolumeComponents,
  ): ecs.EcsTaskDefinitionConfig {
    return {
      networkMode: 'awsvpc',
      requiresCompatibilities: ['FARGATE'],
      cpu: this.config.cpu,
      memory: this.config.memory,
      containerDefinitions: JSON.stringify(
        containers.map((c) => c.getDefinition()),
      ),
      volume: this.getVolumesDefinitions(volumes),
      executionRoleArn: this.config.executionRoleArn,
      family: this.getResourceName('task'),
      tags: this.getResourceNameAsTag('task'),
    };
  }

  /**
   * Get the volumes as expected in the task definition
   */
  protected getVolumesDefinitions(
    volumeComponents: VolumeComponents,
  ): ecs.EcsTaskDefinitionVolume[] {
    return Object.entries(volumeComponents).map(([name, volumeComponent]) => ({
      name,
      efsVolumeConfiguration: {
        fileSystemId: volumeComponent.artifacts.efsFileSystem.id,
        rootDirectory: '/',
      },
    }));
  }

  protected createDiscoveryService() {
    return new servicediscovery.ServiceDiscoveryService(this, 'discovery', {
      name: this.getServiceName(),
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
    });
  }

  protected createEcsService(
    securityGroup: vpc.SecurityGroup,
    taskDefinition: ecs.EcsTaskDefinition,
    discoveryService: servicediscovery.ServiceDiscoveryService,
  ) {
    return new ecs.EcsService(
      this,
      'service',
      this.getEcsServiceConfig(securityGroup, taskDefinition, discoveryService),
    );
  }

  /**
   * Dissociated config method for createEcsService.
   * Allows to override default config.
   */
  protected getEcsServiceConfig(
    securityGroup: vpc.SecurityGroup,
    taskDefinition: ecs.EcsTaskDefinition,
    discoveryService: servicediscovery.ServiceDiscoveryService,
  ): ecs.EcsServiceConfig {
    return {
      cluster: this.config.clusterId,
      taskDefinition: this.getMostRecentTaskDefinition(taskDefinition),
      launchType: 'FARGATE',
      schedulingStrategy: 'REPLICA',
      desiredCount: this.config.desiredCount || 1,
      networkConfiguration: {
        securityGroups: [securityGroup.id],
        subnets: this.config.subnetsIds,
        assignPublicIp: true,
      },

      serviceRegistries: {
        registryArn: discoveryService.arn,
      },

      name: this.getResourceName('service'),
    };
  }

  /**
   * Get the most recent running task definition for the service
   */
  protected getMostRecentTaskDefinition(
    taskDefinition: ecs.EcsTaskDefinition,
  ): string {
    // Get information about latest active task definition
    const activeTaskDefinition = new ecs.DataAwsEcsTaskDefinition(
      this,
      'active-task',
      { taskDefinition: taskDefinition.family },
    );

    const newRevision = Token.asString(taskDefinition.revision);
    const currentRevision = Token.asString(activeTaskDefinition.revision);
    return `${taskDefinition.family}:\${max("${newRevision}", "${currentRevision}")}`;
  }

  protected createVolumeComponents(
    containers: Container[],
    securityGroup: vpc.SecurityGroup,
  ): VolumeComponents {
    // Create configs from all containers
    const volumesConfigs =
      this.aggregateVolumesConfigsFromContainers(containers);

    // Create volume components and store them in a record
    const volumeComponents: VolumeComponents = {};
    for (const [name, config] of Object.entries(volumesConfigs)) {
      volumeComponents[name] = new VolumeComponent(this, name, {
        vpcId: this.config.vpcId,
        subnetsIds: this.config.subnetsIds,
        clientsSecurityGroupsIds: [securityGroup.id],
        preventDestroy: config.preventDestroy,
        enableBackups: config.enableBackups,
      });
    }

    return volumeComponents;
  }

  /**
   * Aggregate and group all mounts points across every container and merge boolean properties
   */
  protected aggregateVolumesConfigsFromContainers(
    containers: Container[],
  ): VolumeConfigs {
    const volumes: VolumeConfigs = {};
    for (const container of containers) {
      const mountPoints = container.getMountPoints();
      for (const mountPoint of mountPoints) {
        const name = mountPoint.sourceVolume;
        const previous: VolumeConfig = volumes[name]
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

  /**
   * If the services use one or more custom Docker images, it should use a continuous deployment.
   * If true, this will create a Code Pipeline to deploy automatically new image versions
   */
  protected createDeployment(
    ecsService: ecs.EcsService,
    containers: Container[],
  ): DeploymentComponent | undefined {
    // Extract the custom images from the containers
    const privateContainers = containers.filter((container) =>
      container.usePrivateImage(),
    );
    // If there is at least one custom image, create a deployment, otherwise return undefined
    if (privateContainers.length === 0) {
      return undefined;
    }
    // Create the deployment
    return new DeploymentComponent(this, 'deploy', {
      triggers: privateContainers.map((pc) => ({
        imageTag: pc.getImageTag(),
        repositoryName: pc.getImageName(),
      })),
      // Loop over all containers because all the service is updated when a private image is updated
      imageDefinitions: JSON.stringify(
        containers.map((c) => c.getImageDefinition()),
      ),
      clusterName: this.config.clusterName,
      serviceName: ecsService.name,
    });
  }

  /**
   * Helper to get a secret key in the secret manager
   */
  getSecretPath(key: string): string {
    return `${this.config.secretsmanagerSecretArn}:${key}::`;
  }

  /**
   * Helper to get the logs group name
   */
  getLogsGroup(): string {
    return this.config.logsGroup;
  }

  /**
   * Helper to get the aws region
   */
  getRegion(): string {
    return this.provider.region || '';
  }

  /**
   * Helper to get the service private domain name
   */
  getServiceDomainName(service: string): string {
    return `${service}.${this.config.privateDnsNamespaceName}`;
  }

  /**
   * Helper to get a deep url of this application
   */
  getApplicationUrl(path = ''): string {
    return `${this.config.applicationBaseUrl}${path}`;
  }

  /**
   * Helper to get Docker image details from the application name
   */
  getDockerApplication(appName: string): DockerApplication {
    if (!this.config.dockerApplications[appName]) {
      throw new Error(`No Docker application found for ${appName}`);
    }
    return this.config.dockerApplications[appName];
  }
}
