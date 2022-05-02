import { PwaComponentDefaultConfig } from '../interfaces';

import { SERVICE_COMPONENT_DEFAULT_CONFIG } from '@tractr/terraform-service-ecs';

export const PWA_COMPONENT_DEFAULT_CONFIG: PwaComponentDefaultConfig = {
  ...SERVICE_COMPONENT_DEFAULT_CONFIG,
  containerConfig: {
    imageTag: 'latest',
    path: {
      prefix: '/',
      stripPrefix: false,
    },
    environments: {
      API_URL: (service) => service.getApplicationUrl('/api'),
    },
  },
};
