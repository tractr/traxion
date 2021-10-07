import { Environment } from '../interfaces';

export const Environments: Environment[] = [
  {
    name: 'Production',
    resourceId: 'prod',
    subDomain: 'www',
    pwaImageTag: 'production',
    apiImageTag: 'production',
  },
  {
    name: 'Staging',
    resourceId: 'staging',
    subDomain: 'staging',
    pwaImageTag: 'latest',
    apiImageTag: 'latest',
  },
];
