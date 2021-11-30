import { Environment } from '../interfaces';

export const Environments: Environment[] = [
  // To add the production uncomment the line below and remove this comment
  // {
  //   name: 'Production',
  //   resourceId: 'prod',
  //   subDomain: 'app',
  //   config: {
  //     pwa: { containerConfig: { imageTag: 'production' } },
  //     api: { containerConfig: { imageTag: 'production' } },
  //     messageBrokerHandler: { containerConfig: { imageTag: 'production' } },
  //     postgres: { enableBackups: true },
  //   },
  // },
  {
    name: 'Staging',
    resourceId: 'staging',
    subDomain: 'staging',
    config: {
      pwa: { containerConfig: { imageTag: 'latest' } },
      api: { containerConfig: { imageTag: 'latest' } },
      messageBrokerHandler: { containerConfig: { imageTag: 'latest' } },
    },
  },
];
