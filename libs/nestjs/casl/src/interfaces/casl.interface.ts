import { AnyAbility } from '@casl/ability';

import { CaslUser, CaslUserRoles, RolePermissions } from '@tractr/common';

export interface CaslOptions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = { roles: R[] },
  A extends AnyAbility = AnyAbility,
> {
  rolePermissions: RolePermissions<R, U, A>;
}
