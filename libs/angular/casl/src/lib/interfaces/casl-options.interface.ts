import { AnyAbility } from '@casl/ability';
import { Observable } from 'rxjs';

import { CaslUser, CaslUserRoles, RolePermissions } from '@tractr/common';

export type UserMin = { [key: string]: unknown; roles: CaslUserRoles[] };

export interface CaslOptions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = UserMin,
  A extends AnyAbility = AnyAbility,
> {
  rolePermissions: RolePermissions<R, U, A>;
  me$: Observable<U>;
}
