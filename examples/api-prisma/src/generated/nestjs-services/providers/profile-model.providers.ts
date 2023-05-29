import { Provider } from '@nestjs/common';

import { PROFILE_SERVICE } from '../constants';
import { ProfileService } from '../services';

export const PROFILE_SERVICES_PROVIDERS: Provider[] = [
  ProfileService,
  {
    provide: PROFILE_SERVICE,
    useExisting: ProfileService,
  },
];
