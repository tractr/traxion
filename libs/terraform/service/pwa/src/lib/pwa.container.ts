import { PwaContainerConfig } from './interfaces';

import {
  COMMON_SENSITIVE_ENVIRONMENT_VARIABLES,
  EnvironmentDefinition,
  HttpContainer,
} from '@trxn/terraform-service-ecs';

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
      value: this.getEnvNames()
        .filter((v) => !COMMON_SENSITIVE_ENVIRONMENT_VARIABLES.includes(v))
        .join(','),
    });

    return envs;
  }
}
