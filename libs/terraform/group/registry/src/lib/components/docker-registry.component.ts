import { ecr } from '@cdktf/provider-aws';

import {
  DockerApplications,
  DockerRegistryComponentArtifacts,
  DockerRegistryComponentConfig,
} from '../interfaces';

import { AwsComponent } from '@trxn/terraform-component-aws';

/**
 * This component creates one docker registry for each app containing a Dockerfile
 */
export class DockerRegistryComponent extends AwsComponent<
  DockerRegistryComponentConfig,
  DockerRegistryComponentArtifacts
> {
  protected createComponents() {
    // Create empty application map
    const applicationsMap: DockerApplications = {};
    // Creates one EcrRepository for each app
    this.config.dockerizedAppsNames.forEach((appName) => {
      // Force name as lower case
      const lowerAppName = appName.toLowerCase();
      const imageName = this.prefixIdWithProjectCode(lowerAppName);
      // Create the Ecr Repository
      const ecrRepository = new ecr.EcrRepository(this, appName, {
        name: this.prefixIdWithProjectCode(lowerAppName),
        tags: this.getResourceNameAsTag(lowerAppName),
      });
      // Populate the applications map so it can be retrieved in the artifacts
      applicationsMap[lowerAppName] = {
        imageName,
        repositoryName: ecrRepository.repositoryUrl,
      };
    });
    // Save the applications map in the artifacts
    this.artifacts = { applicationsMap };
  }

  /**
   * Add the project code to the resource name if exists
   * The project code is provided by the user in the config
   */
  protected prefixIdWithProjectCode(id: string, separator = '/'): string {
    if (this.config.projectCode) {
      // Avoid double prefix
      if (id.startsWith(`${this.config.projectCode}${separator}`)) {
        return id;
      }
      return `${this.config.projectCode}${separator}${id}`;
    }
    return id;
  }
}
