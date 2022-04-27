import { AdminContainerConfig } from './interfaces';

import {
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
        .join(','),
    });

    return envs;
  }
}
