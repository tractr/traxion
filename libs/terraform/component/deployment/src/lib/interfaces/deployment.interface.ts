import { DeploymentTrigger } from './deployment-pipeline.interface';

import {
  DeploymentBuildComponent,
  DeploymentPipelineComponent,
  DeploymentRoleComponent,
  DeploymentStoreComponent,
} from '@tractr/terraform-component-deployment';
import { DeploymentTriggerComponent } from '@tractr/terraform-component-deployment-trigger';

export interface DeploymentComponentConfig {
  imageDefinitions: string;
  triggers: DeploymentTrigger[];
  clusterName: string;
  serviceName: string;
}
export interface DeploymentComponentArtifacts {
  store: DeploymentStoreComponent;
  role: DeploymentRoleComponent;
  build: DeploymentBuildComponent;
  pipeline: DeploymentPipelineComponent;
  trigger: DeploymentTriggerComponent;
}
