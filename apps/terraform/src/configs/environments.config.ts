import { Environment } from '../interfaces';

export const Environments: Environment[] = [
  {
    name: 'Production',
    resourceId: 'prod',
    subDomain: 'www',
    config: {
      pwa: { containerConfig: { imageTag: 'production' } },
      api: {
        containerConfig: { imageTag: 'production' },
        desiredCount: 2,
        cpu: '512',
        memory: '1024',
      },
      postgres: { enableBackups: true },
    },
  },
  {
    name: 'Staging',
    resourceId: 'staging',
    subDomain: 'staging',
    config: {
      pwa: { containerConfig: { imageTag: 'latest' } },
      api: { containerConfig: { imageTag: 'latest' } },
    },
  },
];
