import { ReverseProxyComponentDefaultConfig } from '../interfaces';

import { SERVICE_COMPONENT_DEFAULT_CONFIG } from '@trxn/terraform-service-ecs';

export const REVERSE_PROXY_COMPONENT_DEFAULT_CONFIG: ReverseProxyComponentDefaultConfig =
  {
    ...SERVICE_COMPONENT_DEFAULT_CONFIG,
    containerConfig: {
      imageTag: 'v2.4.8',
      // Those next lines enable access to Traefik dashboard and its basic auth
      // Traefik does not detect himself in ECS
      path: {
        prefix: `/reverse-proxy`,
        stripPrefix: true,
      },
      auth: {
        user: 'traefik',
        passwordHash:
          '$2y$05$x/uCqlUg9QM4fG/toYlN4u/Nri/JBrLpI3UKqTvTH7.PBL40j2F.G', // pass
      },
    },
  };
