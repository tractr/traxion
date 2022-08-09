import { LogstashComponentDefaultConfig } from '../interfaces';

import {
  Secret,
  SERVICE_COMPONENT_DEFAULT_CONFIG,
} from '@tractr/terraform-service-ecs';

export const LOGSTASH_COMPONENT_DEFAULT_CONFIG: LogstashComponentDefaultConfig =
  {
    ...SERVICE_COMPONENT_DEFAULT_CONFIG,
    containerConfig: {
      imageTag: '7.16.3',
      environments: {
        XPACK_MONITORING_ENABLED: 'false',
        XPACK_MANAGEMENT_ENABLED: 'true',
        XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID: Secret(),
        XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH: Secret(),
        XPACK_MANAGEMENT_PIPELINE_ID: Secret(),
      },
    },
  };
