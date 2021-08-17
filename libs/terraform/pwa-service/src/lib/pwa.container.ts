import { PwaContainerConfig } from './configs';

import { Environment, HttpContainer } from '@tractr/terraform-pool-group';

export class PwaContainer extends HttpContainer<PwaContainerConfig> {
  usePrivateImage(): boolean {
    return true;
  }

  protected getAppName(): string {
    return 'pwa';
  }

  getImageTag(): string {
    return 'latest';
  }

  protected getPort(): number {
    return 4200;
  }

  protected getEnvironments(): Environment[] {
    const envs = super.getEnvironments();

    // Get secrets key list
    const secretsNames: string[] = this.getSecretsNames();
    const envsNames: string[] = envs.map((env) => env.name);

    envs.push({
      name: 'ENVS_NAMES',
      value: envsNames.concat(secretsNames).join(','),
    });

    return envs;
  }
}
