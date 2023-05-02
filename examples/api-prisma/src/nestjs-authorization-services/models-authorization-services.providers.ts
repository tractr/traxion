import { Provider } from '@nestjs/common';

import {
  RIGHT_SERVICES_PROVIDERS,
  ROLE_SERVICES_PROVIDERS,
  USER_SERVICES_PROVIDERS,
} from './providers';
import { ValidateAbilitiesService } from './services/ownerships.service';
import { SelectService } from './services/select.service';

export const MODELS_SERVICES_PROVIDERS: Provider[] = [
  ValidateAbilitiesService,
  SelectService,
  ...USER_SERVICES_PROVIDERS,
  ...ROLE_SERVICES_PROVIDERS,
  ...RIGHT_SERVICES_PROVIDERS,
];
