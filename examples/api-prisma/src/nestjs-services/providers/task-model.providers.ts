import { Provider } from '@nestjs/common';
import { TASK_SERVICE, TASK_DEFAULT_SERVICE } from '../constants';
import { TaskService, TaskDefaultService } from '../services';

export const TASK_SERVICES_PROVIDERS: Provider[] = [
  TaskService,
  {
    provide: TASK_SERVICE,
    useExisting: TaskService,
  },
  TaskDefaultService,
  {
    provide: TASK_DEFAULT_SERVICE,
    useExisting: TaskDefaultService,
  },
];
