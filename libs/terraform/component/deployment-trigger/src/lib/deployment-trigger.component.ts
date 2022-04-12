import { snake } from 'case';

import { DeploymentTriggerEventComponent } from './deployment-trigger-event.component';
import { DeploymentTriggerRoleComponent } from './deployment-trigger-role.component';
import {
  DeploymentTriggerComponentArtifacts,
  DeploymentTriggerComponentConfig,
} from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

export class DeploymentTriggerComponent extends AwsComponent<
  DeploymentTriggerComponentConfig,
  DeploymentTriggerComponentArtifacts
> {
  protected createComponents(): void {
    // Create one role for all events
    const role = new DeploymentTriggerRoleComponent(this, 'iam', {
      codepipelineArn: this.config.codepipelineArn,
    });
    // Create one event trigger for each repository
    const events = this.config.repositories.map((repository) => {
      const repositoryShortName = repository.repositoryName.split('/').pop();
      const id = snake(`event_${repositoryShortName}_${repository.imageTag}`);

      return new DeploymentTriggerEventComponent(this, id, {
        roleArn: role.artifacts.role.arn,
        codepipelineArn: this.config.codepipelineArn,
        repositoryName: repository.repositoryName,
        repositoryTag: repository.imageTag,
      });
    });

    // Populate the artifacts
    this.artifacts = {
      ...role.artifacts,
      events: events.map((event) => event.artifacts),
    };
  }
}
