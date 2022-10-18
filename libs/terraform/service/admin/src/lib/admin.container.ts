import { AdminContainerConfig } from './interfaces';

import {
  COMMON_SENSITIVE_ENVIRONMENT_VARIABLES,
  EnvironmentDefinition,
  HttpContainer,
} from '@tractr/terraform-service-ecs';

export class AdminContainer extends HttpContainer<AdminContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'admin';
  }

  protected getPort(): number {
    return 4200;
  }

  protected getEnvironments(): EnvironmentDefinition[] {
    const envs = super.getEnvironments();

    envs.push({
      name: 'ENVS_NAMES',
      value: this.getEnvNames()
        .filter((value) => value !== 'HTML_INDEX_PATH')
        .filter((v) => !COMMON_SENSITIVE_ENVIRONMENT_VARIABLES.includes(v))
        .join(','),
    });

    return envs;
  }
}
