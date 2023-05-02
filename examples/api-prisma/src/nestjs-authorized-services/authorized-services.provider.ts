import { Provider } from '@nestjs/common';
import {
  USER_AUTHORIZED_SERVICE_PROVIDER,
  ROLE_AUTHORIZED_SERVICE_PROVIDER,
  RIGHT_AUTHORIZED_SERVICE_PROVIDER,
} from './providers';

export const AUTHORIZED_SERVICES_PROVIDERS: Provider[] = [];
