import { EcrRepository } from '@cdktf/provider-aws';
import { Token } from 'cdktf';

import { DockerRegistryComponentConfig } from '../interfaces';

import {
  AwsComponent,
  AwsProviderConstruct,
} from '@tractr/terraform-component-aws';

export interface DockerApplication {
  repositoryName: string;
  imageName: string;
}

export type DockerApplications = Record<string, DockerApplication>;

/**
 * This component creates one docker registry for each app containing a Dockerfile
 */
export class DockerRegistryComponent extends AwsComponent<DockerRegistryComponentConfig> {
  protected readonly ecrRepositories: EcrRepository[];

  protected readonly applicationsMap: DockerApplications = {};

  constructor(
    scope: AwsProviderConstruct,
    id: string,
    config: DockerRegistryComponentConfig,
  ) {
    super(scope, id, config);
    this.ecrRepositories = this.createEcrRepositories();
  }

  protected createEcrRepositories() {
    return this.config.dockerizedAppsNames.map((appName) =>
      this.createEcrRepository(appName),
    );
  }

  protected createEcrRepository(appName: string) {
    // Force name as lower case
    const lowerAppName = appName.toLowerCase();
    const imageName = this.prefixIdWithProjectCode(lowerAppName);
    const ecrRepository = new EcrRepository(this, appName, {
      provider: this.provider,
      name: this.prefixIdWithProjectCode(lowerAppName),
      tags: this.getResourceNameAsTag(lowerAppName),
    });
    this.applicationsMap[lowerAppName] = {
      imageName,
      repositoryName: Token.asString(ecrRepository.repositoryUrl),
    };
    return ecrRepository;
  }

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

  getApplicationsMap(): DockerApplications {
    return this.applicationsMap;
  }
}
