import { AbilityBuilder, AnyAbility } from '@casl/ability';
import type { User, UserRoles } from '@prisma/client';
import { Observable } from 'rxjs';

export type DefinePermissions<T extends AnyAbility = AnyAbility> = (
  ability: AbilityBuilder<T>,
  user?: User,
) => void;

export interface CaslOptions<T extends AnyAbility = AnyAbility> {
  rolePermissions: Record<UserRoles, DefinePermissions<T>>;
  me$: Observable<User>;
}
