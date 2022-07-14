import { Environment } from '../interfaces';

const adminPathConfig = {
  path: { prefix: '/admin' },
  environments: { HTML_BASE_HREF: '/admin/' },
};

export const Environments: Environment[] = [
  {
    name: 'Production',
    resourceId: 'prod',
    subDomain: 'www',
    config: {
      pwa: { containerConfig: { imageTag: 'production' } },
      admin: {
        containerConfig: {
          imageTag: 'production',
          ...adminPathConfig,
        },
      },
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
      admin: {
        containerConfig: {
          imageTag: 'latest',
          ...adminPathConfig,
        },
      },
      api: { containerConfig: { imageTag: 'latest' } },
    },
  },
];
