import { MODULE_OPTIONS_TOKEN } from '../authorized-services.module-definition';
import { DefaultOwnershipSelect } from '../interfaces';

export const DEFAULT_OWNERSHIP_SELECT = 'DEFAULT_OWNERSHIP_SELECT';
export const DefaultOwnershipSelectProvider = {
  provide: DEFAULT_OWNERSHIP_SELECT,
  useFactory: (options: DefaultOwnershipSelect) =>
    options.defaultOwnershipSelect,
  inject: [MODULE_OPTIONS_TOKEN],
};
