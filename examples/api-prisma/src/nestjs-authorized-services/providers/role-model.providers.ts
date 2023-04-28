import { Provider } from '@nestjs/common';

import { ROLE_AUTHORIZED_SERVICE } from '../constants';
import { RoleAuthorizedService } from '../services';

export const ROLE_SERVICES_PROVIDERS: Provider[] = [
  RoleAuthorizedService,
  {
    provide: ROLE_AUTHORIZED_SERVICE,
    useExisting: RoleAuthorizedService,
  },
];
