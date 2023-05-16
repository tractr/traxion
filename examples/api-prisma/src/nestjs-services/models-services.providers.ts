import { Provider } from '@nestjs/common';
import { USER_SERVICES_PROVIDERS, TASK_SERVICES_PROVIDERS } from './providers';

export const MODELS_SERVICES_PROVIDERS: Provider[] = [
  ...USER_SERVICES_PROVIDERS,
  ...TASK_SERVICES_PROVIDERS,
];
