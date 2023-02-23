import { LogstashComponentDefaultConfig } from '../interfaces';

import {
  Secret,
  SERVICE_COMPONENT_DEFAULT_CONFIG,
} from '@trxn/terraform-service-ecs';

export const LOGSTASH_COMPONENT_DEFAULT_CONFIG: LogstashComponentDefaultConfig =
  {
    ...SERVICE_COMPONENT_DEFAULT_CONFIG,
    cpu: '512',
    memory: '1024',
    containerConfig: {
      imageName: 'tractr/logstash-input-cloudwatch',
      imageTag: '8.3.3',
      environments: {
        XPACK_MONITORING_ENABLED: 'false',
        XPACK_MANAGEMENT_ENABLED: 'true',
        XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_ID: Secret(),
        XPACK_MANAGEMENT_ELASTICSEARCH_CLOUD_AUTH: Secret(),
        XPACK_MANAGEMENT_PIPELINE_ID: Secret(),
      },
    },
  };
