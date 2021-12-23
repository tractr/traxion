import { snake } from 'case';

import { DeploymentTriggerEventComponent } from './deployment-trigger-event.component';
import { DeploymentTriggerRoleComponent } from './deployment-trigger-role.component';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface Repository {
  repositoryName: string;
  imageTag: string;
}
export interface DeploymentTriggerComponentConfig {
  codepipelineArn: string;
  repositories: Repository[];
}

export class DeploymentTriggerComponent extends AwsComponent<DeploymentTriggerComponentConfig> {
  protected readonly deploymentTriggerRoleComponent: DeploymentTriggerRoleComponent;

  protected readonly deploymentTriggerEventComponents: DeploymentTriggerEventComponent[];

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DeploymentTriggerComponentConfig,
  ) {
    super(scope, id, config);

    this.deploymentTriggerRoleComponent =
      this.crateDeploymentTriggerRoleComponent();
    this.deploymentTriggerEventComponents =
      this.createDeploymentTriggerEventComponents();
  }

  protected crateDeploymentTriggerRoleComponent() {
    return new DeploymentTriggerRoleComponent(this, 'iam', {
      codepipelineArn: this.config.codepipelineArn,
    });
  }

  protected createDeploymentTriggerEventComponents() {
    return this.config.repositories.map((repository) =>
      this.createDeploymentTriggerEventComponent(repository),
    );
  }

  protected createDeploymentTriggerEventComponent(repository: Repository) {
    const repositoryShortName = repository.repositoryName.split('/').pop();
    const id = snake(`event_${repositoryShortName}_${repository.imageTag}`);
    return new DeploymentTriggerEventComponent(this, id, {
      roleArn: this.deploymentTriggerRoleComponent.getIamRoleArnAsToken(),
      codepipelineArn: this.config.codepipelineArn,
      repositoryName: repository.repositoryName,
      repositoryTag: repository.imageTag,
    });
  }
}
