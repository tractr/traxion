import { Provider } from '@nestjs/common';

import { USER_AUTHORIZED_SERVICE } from '../constants';
import { UserAuthorizedService } from '../services';

export const USER_SERVICES_PROVIDERS: Provider[] = [
  UserAuthorizedService,
  {
    provide: USER_AUTHORIZED_SERVICE,
    useExisting: UserAuthorizedService,
  },
];
