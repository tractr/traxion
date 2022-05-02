import { DockerRegistryComponent } from './components';
import { RegistryGroupArtifacts, RegistryGroupConfig } from './interfaces';

import { AwsComponent } from '@tractr/terraform-component-aws';

/**
 * This group create code and containers registries (docker, npm, etc.)
 */
export class RegistryGroup extends AwsComponent<
  RegistryGroupConfig,
  RegistryGroupArtifacts
> {
  protected createComponents() {
    // Create the docker registry component
    const dockerRegistryComponent = new DockerRegistryComponent(
      this,
      'docker',
      {
        projectCode: this.config.projectCode,
        dockerizedAppsNames: this.config.appsPath,
      },
    );
    // Populate the artifacts
    this.artifacts = {
      ...dockerRegistryComponent.artifacts,
    };
  }
}
