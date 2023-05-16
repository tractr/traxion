import { Provider } from '@nestjs/common';
import { USER_SERVICE, USER_DEFAULT_SERVICE } from '../constants';
import { UserService, UserDefaultService } from '../services';

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
