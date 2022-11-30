import { PostgresComponentDefaultConfig } from '../interfaces';

import {
  Secret,
  SERVICE_COMPONENT_DEFAULT_CONFIG,
} from '@trxn/terraform-service-ecs';

export const POSTGRES_COMPONENT_DEFAULT_CONFIG: PostgresComponentDefaultConfig =
  {
    ...SERVICE_COMPONENT_DEFAULT_CONFIG,
    containerConfig: {
      imageTag: '13-alpine',
      environments: {
        POSTGRES_DB: 'api',
        POSTGRES_USER: Secret(),
        POSTGRES_PASSWORD: Secret(),
      },
    },
    enableBackups: false,
    backupsConfig: {
      imageTag: 'v1.7',
      environments: {
        VOLUMERIZE_SOURCE: '/source',
        VOLUMERIZE_TARGET: 'file:///backups',
        VOLUMERIZE_JOBBER_TIME: '0 0 */4 * * *',
        VOLUMERIZE_FULL_IF_OLDER_THAN: '3D',
        JOB_NAME2: 'RemoveOldBackups',
        JOB_COMMAND2: '/etc/volumerize/remove-older-than 1M --force',
        JOB_TIME2: '0 0 2 * * *',
        JOB_NOTIFY_ERR2: 'true',
        JOB_NOTIFY_FAIL2: 'true',
        JOB_NAME3: 'CleanupBackups',
        JOB_COMMAND3: '/etc/volumerize/cleanup --force',
        JOB_TIME3: '0 0 3 * * *',
        JOB_NOTIFY_ERR3: 'true',
        JOB_NOTIFY_FAIL3: 'true',
        POSTGRES_DB: 'api',
        POSTGRES_USER: Secret(),
        POSTGRES_PASSWORD: Secret(),
        POSTGRES_HOST: (service) => service.getServiceDomainName('postgres'),
        POSTGRES_PORT: '5432',
      },
    },
  };
