import { Provider } from '@nestjs/common';
import { PROFILE_SERVICE, PROFILE_DEFAULT_SERVICE } from '../constants';
import { ProfileService, ProfileDefaultService } from '../services';

export const PROFILE_SERVICES_PROVIDERS: Provider[] = [
  ProfileService,
  {
    provide: PROFILE_SERVICE,
    useExisting: ProfileService,
  },
  ProfileDefaultService,
  {
    provide: PROFILE_DEFAULT_SERVICE,
    useExisting: ProfileDefaultService,
  },
];
