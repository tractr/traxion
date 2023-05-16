import { DefaultOwnershipSelect } from '../interfaces';
import { MODULE_OPTIONS_TOKEN } from '../authorized-services.module-definition';

export const DEFAULT_OWNERSHIP_SELECT = 'DEFAULT_OWNERSHIP_SELECT';
export const DefaultOwnershipSelectProvider = {
  provide: DEFAULT_OWNERSHIP_SELECT,
  useFactory: (options: DefaultOwnershipSelect) =>
    options.defaultOwnershipSelect,
  inject: [MODULE_OPTIONS_TOKEN],
};
