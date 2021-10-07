import { PwaContainerConfig } from './interfaces';

import { Environment, HttpContainer } from '@tractr/terraform-ecs-services';

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

  protected getEnvironments(): Environment[] {
    const envs = super.getEnvironments();

    envs.push({
      name: 'ENVS_NAMES',
      value: this.getEnvNames().join(','),
    });

    return envs;
  }
}