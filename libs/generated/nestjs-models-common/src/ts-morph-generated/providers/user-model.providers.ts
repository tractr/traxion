import { Provider } from '@nestjs/common';

import { USER_SERVICE } from '../constants';
import { UserService } from '../services';

export const USER_SERVICES_PROVIDERS: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];
