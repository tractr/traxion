import { subject } from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Right, Role, User } from '@prisma/client';

import { AppAbility } from '../../casl';

import { Action } from '@trxn/nestjs-casl';

export type UserValidateOwnership = {
  id: User['id'];
  role?: RoleValidateOwnership;
  roleId: User['roleId'];
};

export type RoleValidateOwnership = {
  rights?: RightValidateOwnership[];
  users?: UserValidateOwnership[];
};

export type RightValidateOwnership = {
  role: Right['id'];
  roles?: RoleValidateOwnership[];
};

export type DeepCanOptions = {
  throwOnNotAllowedDependencies?: boolean;
};

@Injectable()
export class ValidateAbilitiesService {
  ensureAbilities(abilities: AppAbility) {
    if (!abilities)
      throw new ForbiddenException(
        'No abilities found, you need to configure casl',
      );
  }

  validateUserDeep<T extends UserValidateOwnership>(
    abilities: AppAbility,
    action: Action,
    user: T,
    { throwOnNotAllowedDependencies = true }: DeepCanOptions = {},
  ): T {
    this.ensureAbilities(abilities);

    if (abilities.cannot(action, subject('User', user as unknown as User)))
      throw new ForbiddenException(`Current user cannot ${action} this user`);

    const validatedUser = { ...user };

    if (user.role)
      try {
        validatedUser.role = this.validateRoleDeep(
          abilities,
          action,
          user.role,
        );
      } catch (e) {
        if (throwOnNotAllowedDependencies) throw e;
      }

    return validatedUser;
  }

  validateRoleDeep<T extends RoleValidateOwnership>(
    abilities: AppAbility,
    action: Action,
    role: T,
    { throwOnNotAllowedDependencies = true }: DeepCanOptions = {},
  ): T {
    this.ensureAbilities(abilities);

    console.log(action, role);

    if (abilities.cannot(action, subject('Role', role as unknown as Role)))
      throw new ForbiddenException(`Current user cannot ${action} this role`);

    const validatedRole = { ...role };

    if (role.rights)
      validatedRole.rights = role.rights.filter((right) => {
        try {
          this.validateRightDeep(abilities, action, right);
          return true;
        } catch (e) {
          if (throwOnNotAllowedDependencies) throw e;
          return false;
        }
      });

    return validatedRole;
  }

  validateRightDeep<T extends RightValidateOwnership>(
    abilities: AppAbility,
    action: Action,
    right: T,
    { throwOnNotAllowedDependencies = true }: DeepCanOptions = {},
  ): T {
    this.ensureAbilities(abilities);

    if (abilities.cannot(action, subject('Right', right as unknown as Right)))
      throw new ForbiddenException(`Current user cannot ${action} this right`);

    const validatedRole = { ...right };

    if (right.roles)
      validatedRole.roles = right.roles.filter((role) => {
        try {
          this.validateRoleDeep(abilities, action, role);
          return true;
        } catch (e) {
          if (throwOnNotAllowedDependencies) throw e;
          return false;
        }
      });

    return validatedRole;
  }
}
