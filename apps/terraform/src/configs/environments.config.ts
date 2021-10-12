import { Environment } from '../interfaces';

export const Environments: Environment[] = [
  {
    name: 'Production',
    resourceId: 'prod',
    subDomain: 'www',
    pwaConfig: { containerConfig: { imageTag: 'production' } },
    apiConfig: {
      containerConfig: { imageTag: 'production' },
      desiredCount: 2,
      cpu: '512',
      memory: '1024',
    },
  },
  {
    name: 'Staging',
    resourceId: 'staging',
    subDomain: 'staging',
    pwaConfig: { containerConfig: { imageTag: 'latest' } },
    apiConfig: { containerConfig: { imageTag: 'latest' } },
  },
];
