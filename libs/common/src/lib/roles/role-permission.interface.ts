import { AbilityBuilder, AnyAbility } from '@casl/ability';

export const CaslUserRoles: {
  admin: 'admin';
  user: 'user';
  guest: 'guest';
} = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
};

export type CaslUserRoles = typeof CaslUserRoles[keyof typeof CaslUserRoles];

export interface CaslUser {
  roles: CaslUserRoles[];
}

export type DefinePermissions<U extends CaslUser, A extends AnyAbility> = (
  builder: AbilityBuilder<A>,
  user: U,
) => void;

export type RolePermissions<
  R extends CaslUserRoles = CaslUserRoles,
  U extends CaslUser = { roles: R[] },
  A extends AnyAbility = AnyAbility,
> = Record<R, DefinePermissions<U, A>>;
