import { Provider } from '@nestjs/common';
import { ROLE_AUTHORIZED_SERVICE } from '../constants';
import { RoleAuthorizedService } from '../services';

export const ROLE_AUTHORIZED_SERVICE_PROVIDER: Provider[] = [
  RoleAuthorizedService,
  {
    provide: ROLE_AUTHORIZED_SERVICE,
    useExisting: RoleAuthorizedService,
  },
];
