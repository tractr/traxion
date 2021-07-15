import { AnyAbility } from '@casl/ability';

import { DefinePermissions } from './define-permission.interfaces';
import { CaslUser, CaslUserRoles } from './user.interfaces';

export interface CaslOptions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = { roles: R[] },
  A extends AnyAbility = AnyAbility,
> {
  rolePermissions: Record<R, DefinePermissions<U, A>>;
}
