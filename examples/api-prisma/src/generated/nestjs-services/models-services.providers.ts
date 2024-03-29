import { Provider } from '@nestjs/common';

import {
  PROFILE_SERVICES_PROVIDERS,
  TASK_SERVICES_PROVIDERS,
  USER_SERVICES_PROVIDERS,
} from './providers';

export const MODELS_SERVICES_PROVIDERS: Provider[] = [
  ...USER_SERVICES_PROVIDERS,
  ...PROFILE_SERVICES_PROVIDERS,
  ...TASK_SERVICES_PROVIDERS,
];
