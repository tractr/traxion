import { DockerApplications, DockerRegistryComponent } from './components';
import { RegistryGroupConfig } from './interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

/**
 * This group create code and containers registries (docker, npm, etc.)
 */
export class RegistryGroup extends AwsComponent<RegistryGroupConfig> {
  protected readonly dockerRegistryComponent: DockerRegistryComponent;

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: RegistryGroupConfig,
  ) {
    super(scope, id, config);
    this.dockerRegistryComponent = this.createDockerRegistryComponent();
  }

  protected createDockerRegistryComponent() {
    return new DockerRegistryComponent(this, 'docker', {
      projectCode: this.config.projectCode,
      dockerizedAppsNames: this.config.appsPath,
    });
  }

  getDockerApplications(): DockerApplications {
    return this.dockerRegistryComponent.getApplicationsMap();
  }
}
