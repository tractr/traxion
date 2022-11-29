import { AdminComponentDefaultConfig } from '../interfaces';

import { SERVICE_COMPONENT_DEFAULT_CONFIG } from '@trxn/terraform-service-ecs';

export const ADMIN_COMPONENT_DEFAULT_CONFIG: AdminComponentDefaultConfig = {
  ...SERVICE_COMPONENT_DEFAULT_CONFIG,
  containerConfig: {
    imageTag: 'latest',
    path: {
      prefix: '/admin',
      stripPrefix: true,
    },
    environments: {
      API_URL: (service) => service.getApplicationUrl('/api'),
      HTML_BASE_HREF: '/admin/',
      HTML_INDEX_PATH: '/usr/share/nginx/html/index.html',
    },
  },
};
