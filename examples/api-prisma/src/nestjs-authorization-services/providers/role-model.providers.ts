import { Provider } from '@nestjs/common';

import { RoleService } from '../services';

export const ROLE_SERVICES_PROVIDERS: Provider[] = [RoleService];
