import { Provider } from '@nestjs/common';

import { TASK_SERVICE } from '../constants';
import { TaskService } from '../services';

export const TASK_SERVICES_PROVIDERS: Provider[] = [
  TaskService,
  {
    provide: TASK_SERVICE,
    useExisting: TaskService,
  },
];
