import { Provider } from '@nestjs/common';

import { TASK_AUTHORIZED_SERVICE } from '../constants';
import { TaskAuthorizedService } from '../services';

export const TASK_AUTHORIZED_SERVICE_PROVIDER: Provider[] = [
  TaskAuthorizedService,
  {
    provide: TASK_AUTHORIZED_SERVICE,
    useExisting: TaskAuthorizedService,
  },
];
