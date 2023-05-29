/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbilityBuilder, AnyAbility } from '@casl/ability';

export type DefinePermissions<B extends AbilityBuilder<AnyAbility>, U> = (
  ability: B,
  user: U,
) => void;

export type DefinePublicPermissions<B extends AbilityBuilder<AnyAbility>> = (
  ability: B,
) => void;

export type RolePermissions<
  R extends string,
  B extends AbilityBuilder<AnyAbility>,
  U extends Record<string, unknown>,
> = Record<R, DefinePermissions<B, U>>;

export type CaslModuleOptions<
  R extends string,
  U extends Record<string, unknown>,
  B extends AbilityBuilder<any>,
> = {
  rolePermissions: Record<R, DefinePermissions<B, U>>;
  getRoles: (user: U) => R[] | R;
  publicPermissions?: DefinePublicPermissions<B>;
};

export type UntypedCaslModuleOptions = CaslModuleOptions<
  string,
  Record<string, unknown>,
  AbilityBuilder<AnyAbility>
>;
