import { DeploymentBuildComponent } from './deployment-build.component';
import { DeploymentPipelineComponent } from './deployment-pipeline.component';
import { DeploymentRoleComponent } from './deployment-role.component';
import { DeploymentStoreComponent } from './deployment-store.component';
import {
  DeploymentComponentArtifacts,
  DeploymentComponentConfig,
} from './interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';
import { DeploymentTriggerComponent } from '@trxn/terraform-component-deployment-trigger';

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
      storeS3Bucket: store.artifacts.bucket,
    });
  }

  protected createBuildComponent(role: DeploymentRoleComponent) {
    return new DeploymentBuildComponent(this, 'build', {
      role: role.artifacts.role,
      imageDefinitions: this.config.imageDefinitions,
    });
  }

  protected createPipelineComponent(
    store: DeploymentStoreComponent,
    role: DeploymentRoleComponent,
    build: DeploymentBuildComponent,
  ) {
    return new DeploymentPipelineComponent(this, 'pipe', {
      storeS3Bucket: store.artifacts.bucket,
      role: role.artifacts.role,
      buildProject: build.artifacts.project,
      triggers: this.config.triggers,
      cluster: this.config.cluster,
      service: this.config.service,
    });
  }

  protected createTriggerComponent(pipeline: DeploymentPipelineComponent) {
    return new DeploymentTriggerComponent(this, 'trigger', {
      codepipeline: pipeline.artifacts.pipeline,
      repositories: this.config.triggers,
    });
  }
}
