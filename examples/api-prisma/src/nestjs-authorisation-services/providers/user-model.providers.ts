import { Provider } from '@nestjs/common';

import { UserAuthorizationService } from '../services';

export const USER_SERVICES_PROVIDERS: Provider[] = [UserAuthorizationService];
