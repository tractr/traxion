import { Provider } from '@nestjs/common';

import {
  RIGHT_SERVICES_PROVIDERS,
  ROLE_SERVICES_PROVIDERS,
  USER_SERVICES_PROVIDERS,
} from './providers';

export const MODELS_SERVICES_PROVIDERS: Provider[] = [
  ...USER_SERVICES_PROVIDERS,
  ...ROLE_SERVICES_PROVIDERS,
  ...RIGHT_SERVICES_PROVIDERS,
];
