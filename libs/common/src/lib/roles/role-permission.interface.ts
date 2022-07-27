import { AbilityBuilder, AnyAbility } from '@casl/ability';
import { extend } from 'lodash';

export const CaslDefaultRoles = {
  admin: 'admin',
  user: 'user',
  guest: 'guest',
} as const;

export type CaslDefaultRoles = keyof typeof CaslDefaultRoles;

export type CaslRoles<CustomRoles extends string = never> =
  | CustomRoles
  | CaslDefaultRoles;

export interface CaslUser<CustomRoles extends string = never>
  extends Record<string, unknown> {
  roles: CaslRoles<CustomRoles>[];
}

export type PublicDefinePermissions<
  CustomAbility extends AnyAbility = AnyAbility,
> = (builder: AbilityBuilder<CustomAbility>) => void;

export type AuthenticatedDefinePermissions<
  CustomRoles extends string = never,
  CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
  CustomAbility extends AnyAbility = AnyAbility,
> = (builder: AbilityBuilder<CustomAbility>, user: CustomUser) => void;

export type DefinePermissions<
  CustomRoles extends string = never,
  CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
  CustomAbility extends AnyAbility = AnyAbility,
> =
  | AuthenticatedDefinePermissions<CustomRoles, CustomUser, CustomAbility>
  | PublicDefinePermissions;

export type RolePermissions<
  CustomRoles extends string = never,
  CustomUser extends CaslUser<CustomRoles> = CaslUser<CustomRoles>,
  CustomAbility extends AnyAbility = AnyAbility,
> = Record<
  CaslRoles<CustomRoles>,
  DefinePermissions<CustomRoles, CustomUser, CustomAbility>
>;
