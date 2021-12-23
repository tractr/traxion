import { DeploymentBuildComponent } from './deployment-build.component';
import {
  DeploymentPipelineComponent,
  DeploymentTrigger,
} from './deployment-pipeline.component';
import { DeploymentRoleComponent } from './deployment-role.component';
import { DeploymentStoreComponent } from './deployment-store.component';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';
import { DeploymentTriggerComponent } from '@tractr/terraform-component-deployment-trigger';

export interface DeploymentComponentConfig {
  imageDefinitions: string;
  triggers: DeploymentTrigger[];
  clusterName: string;
  serviceName: string;
}

export class DeploymentComponent extends AwsComponent<DeploymentComponentConfig> {
  protected readonly deploymentStoreComponent: DeploymentStoreComponent;

  protected readonly deploymentRoleComponent: DeploymentRoleComponent;

  protected readonly deploymentBuildComponent: DeploymentBuildComponent;

  protected readonly deploymentPipelineComponent: DeploymentPipelineComponent;

  protected readonly deploymentTriggerComponent: DeploymentTriggerComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentComponentConfig,
  ) {
    super(scope, id, config);

    this.deploymentStoreComponent = this.createDeploymentStoreComponent();
    this.deploymentRoleComponent = this.createDeploymentRoleComponent();
    this.deploymentBuildComponent = this.createDeploymentBuildComponent();
    this.deploymentPipelineComponent = this.createDeploymentPipelineComponent();
    this.deploymentTriggerComponent = this.createDeploymentTriggerComponent();
  }

  protected createDeploymentStoreComponent() {
    return new DeploymentStoreComponent(this, 'store');
  }

  protected createDeploymentRoleComponent() {
    return new DeploymentRoleComponent(this, 'code', {
      storeS3Arn: this.deploymentStoreComponent.getBucketArnAsToken(),
    });
  }

  protected createDeploymentBuildComponent() {
    return new DeploymentBuildComponent(this, 'build', {
      roleArn: this.deploymentRoleComponent.getIamRoleArnAsToken(),
      imageDefinitions: this.config.imageDefinitions,
    });
  }

  protected createDeploymentPipelineComponent() {
    return new DeploymentPipelineComponent(this, 'pipe', {
      storeS3Name: this.deploymentStoreComponent.getBucketNameAsToken(),
      roleArn: this.deploymentRoleComponent.getIamRoleArnAsToken(),
      buildProjectName: this.deploymentBuildComponent.getProjectNameAsToken(),
      triggers: this.config.triggers,
      clusterName: this.config.clusterName,
      serviceName: this.config.serviceName,
    });
  }

  protected createDeploymentTriggerComponent() {
    return new DeploymentTriggerComponent(this, 'trigger', {
      codepipelineArn:
        this.deploymentPipelineComponent.getCodepipelineArnAsToken(),
      repositories: this.config.triggers,
    });
  }
}
