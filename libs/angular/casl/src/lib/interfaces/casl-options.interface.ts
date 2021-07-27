import { AnyAbility } from '@casl/ability';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

import { CaslUser, CaslUserRoles, RolePermissions } from '@tractr/common';

export type UserMin = { id: User['id']; roles: CaslUserRoles[] };

export interface CaslOptions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = UserMin,
  A extends AnyAbility = AnyAbility,
> {
  rolePermissions: RolePermissions<R, U, A>;
  me$: Observable<U>;
}
