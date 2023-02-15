import { ecs } from '@cdktf/provider-aws';

import { DeploymentTrigger } from './deployment-pipeline.interface';
import { DeploymentBuildComponent } from '../deployment-build.component';
import { DeploymentPipelineComponent } from '../deployment-pipeline.component';
import { DeploymentRoleComponent } from '../deployment-role.component';
import { DeploymentStoreComponent } from '../deployment-store.component';

import { DeploymentTriggerComponent } from '@trxn/terraform-component-deployment-trigger';

export interface DeploymentComponentConfig {
  imageDefinitions: string;
  triggers: DeploymentTrigger[];
  cluster: ecs.EcsCluster;
  service: ecs.EcsService;
}
export interface DeploymentComponentArtifacts {
  store: DeploymentStoreComponent;
  role: DeploymentRoleComponent;
  build: DeploymentBuildComponent;
  pipeline: DeploymentPipelineComponent;
  trigger: DeploymentTriggerComponent;
}
