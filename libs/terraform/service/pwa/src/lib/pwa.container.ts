import { PwaContainerConfig } from './interfaces';

import {
  EnvironmentDefinition,
  HttpContainer,
} from '@tractr/terraform-service-ecs';

export class PwaContainer extends HttpContainer<PwaContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'pwa';
  }

  protected getPort(): number {
    return 4200;
  }

  protected getEnvironments(): EnvironmentDefinition[] {
    const envs = super.getEnvironments();

    envs.push({
      name: 'ENVS_NAMES',
      value: this.getEnvNames().join(','),
    });

    return envs;
  }
}
