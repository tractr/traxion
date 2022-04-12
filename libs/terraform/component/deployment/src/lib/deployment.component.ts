import { DeploymentBuildComponent } from './deployment-build.component';
import { DeploymentPipelineComponent } from './deployment-pipeline.component';
import { DeploymentRoleComponent } from './deployment-role.component';
import { DeploymentStoreComponent } from './deployment-store.component';
import {
  DeploymentComponentArtifacts,
  DeploymentComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';
import { DeploymentTriggerComponent } from '@tractr/terraform-component-deployment-trigger';

export class DeploymentComponent extends AwsComponent<
  DeploymentComponentConfig,
  DeploymentComponentArtifacts
> {
  protected createComponents(): void {
    const store = this.createStoreComponent();
    const role = this.createRoleComponent(store);
    const build = this.createBuildComponent(role);
    const pipeline = this.createPipelineComponent(store, role, build);
    const trigger = this.createTriggerComponent(pipeline);
    // Populate the artifacts
    this.artifacts = {
      store,
      role,
      build,
      pipeline,
      trigger,
    };
  }

  protected createStoreComponent() {
    return new DeploymentStoreComponent(this, 'store', {});
  }

  protected createRoleComponent(store: DeploymentStoreComponent) {
    return new DeploymentRoleComponent(this, 'code', {
      storeS3Arn: store.artifacts.bucket.arn,
    });
  }

  protected createBuildComponent(role: DeploymentRoleComponent) {
    return new DeploymentBuildComponent(this, 'build', {
      roleArn: role.artifacts.role.arn,
      imageDefinitions: this.config.imageDefinitions,
    });
  }

  protected createPipelineComponent(
    store: DeploymentStoreComponent,
    role: DeploymentRoleComponent,
    build: DeploymentBuildComponent,
  ) {
    return new DeploymentPipelineComponent(this, 'pipe', {
      storeS3Name: store.artifacts.bucket.bucket,
      roleArn: role.artifacts.role.arn,
      buildProjectName: build.artifacts.project.name,
      triggers: this.config.triggers,
      clusterName: this.config.clusterName,
      serviceName: this.config.serviceName,
    });
  }

  protected createTriggerComponent(pipeline: DeploymentPipelineComponent) {
    return new DeploymentTriggerComponent(this, 'trigger', {
      codepipelineArn: pipeline.artifacts.pipeline.arn,
      repositories: this.config.triggers,
    });
  }
}
