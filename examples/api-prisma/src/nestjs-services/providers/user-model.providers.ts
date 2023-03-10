import { Provider } from '@nestjs/common';

import { USER_DEFAULT_SERVICE, USER_SERVICE } from '../constants';
import { UserDefaultService, UserService } from '../services';

export const USER_SERVICES_PROVIDERS: Provider[] = [
  UserService,
  {
    provide: USER_SERVICE,
    useExisting: UserService,
  },
  UserDefaultService,
  {
    provide: USER_DEFAULT_SERVICE,
    useExisting: UserDefaultService,
  },
];
