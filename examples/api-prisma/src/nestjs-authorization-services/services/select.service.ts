import { accessibleBy } from '@casl/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { AppAbility } from '../../casl';
import { MODULE_OPTIONS_TOKEN } from '../models-authorization-services.module-definition';
import { AuthorizationServicesModuleOptions, OwnerShipSelect } from '../types';

@Injectable()
export class SelectService {
  defaultOwnershipSelect: OwnerShipSelect =
    this.authorizationOptions.defaultOwnershipIndexes;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly authorizationOptions: AuthorizationServicesModuleOptions,
  ) {}

  /**
   * Remove all the properties from data that are true in toRemove, deeply
   * @param data
   * @param toRemove
   */
  removeUnusedProperties(
    data: Record<string, unknown>,
    toRemove: Record<string, unknown>,
  ) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (key in toRemove && toRemove[key] === true) return acc;
      if (
        value &&
        key in toRemove &&
        typeof toRemove[key] === 'object' &&
        typeof value === 'object'
      )
        acc[key] = this.removeUnusedProperties(
          value as Record<string, unknown>,
          toRemove[key] as Record<string, unknown>,
        );

      acc[key] = data[key];
      return acc;
    }, {} as Record<string, unknown>);
  }

  getUserWhereInput(
    abilities: AppAbility,
    where: Prisma.UserWhereInput = {},
    args: Prisma.UserArgs = {},
  ): Prisma.UserWhereInput {
    const role = !!args.include?.role || !!args.select?.role;
    const roleWhere = role ? { role: this.getRoleWhereInput(abilities) } : {};

    return {
      AND: [accessibleBy(abilities).User, where, roleWhere],
    };
  }

  getRoleWhereInput(
    abilities: AppAbility,
    where: Prisma.RoleWhereInput = {},
  ): Prisma.RoleWhereInput {
    return {
      AND: [accessibleBy(abilities).Role, where],
    };
  }

  getRightWhereInput(
    abilities: AppAbility,
    where: Prisma.RightWhereInput = {},
  ): Prisma.RightWhereInput {
    return {
      AND: [accessibleBy(abilities).Right, where],
    };
  }

  /**
   * Get the CASL select for the Role model
   * This function will return the select and include properties that are needed to apply the ownerships restrictions
   *
   * To do so, it will traverse the user params and add the where clause to the select and include properties
   *
   */
  getUserArgs<T extends Prisma.UserArgs | Prisma.Role$usersArgs>(
    abilities: AppAbility,
    args: T,
  ): T {
    // Create the UserArgs return object
    const userArgs = { ...args };

    // Manage include and select
    // In prisma you can have either include or select, but not both
    // The include and the select are both the same on the relation field
    // To construct the UserArgs, we will treat the include and the select the same way
    const { include, select } = args;

    let join: 'include' | 'select' | undefined;

    if (include) join = 'include';
    if (select) join = 'select';

    let { role, ...rest } = (join && args[join]) || {};

    // If the role is an object, we will get the args for the role
    if (typeof role !== 'undefined') {
      const roleArgs = typeof role === 'boolean' ? {} : role;

      role = {
        ...roleArgs,
        ...this.getRoleArgs(abilities, roleArgs),
      };
    }

    if (!join) return userArgs;

    return {
      ...userArgs,
      [join]: {
        ...rest,
        role,
        ...(join === 'select' && this.defaultOwnershipSelect.User),
      },
    };
  }

  getRoleArgs<T extends Prisma.RoleArgs | Prisma.Right$rolesArgs>(
    abilities: AppAbility,
    args: T,
  ): T {
    const roleArgs = { ...args };

    const { include, select } = args;

    let join: 'include' | 'select' | undefined;

    if (include) join = 'include';
    if (select) join = 'select';

    let { rights, users, ...rest } = (join && args[join]) || {};

    if (typeof rights !== 'undefined') {
      const rightsArgs = typeof rights === 'boolean' ? {} : rights;

      rights = {
        ...rightsArgs,
        ...this.getRightArgs(abilities, rightsArgs),

        where: this.getRightWhereInput(abilities, rightsArgs?.where || {}),
      };
    }

    if (typeof users !== 'undefined') {
      const usersArgs = typeof users === 'boolean' ? {} : users;

      users = {
        ...usersArgs,
        ...this.getUserArgs(abilities, usersArgs),

        where: this.getUserWhereInput(abilities, usersArgs?.where || {}),
      };
    }

    if (!join) return roleArgs;

    return {
      ...roleArgs,
      [join]: {
        ...rest,
        rights,
        users,
        ...(join === 'select' && this.defaultOwnershipSelect.Role),
      },
    };
  }

  getRightArgs<T extends Prisma.RightArgs | Prisma.Role$rightsArgs>(
    abilities: AppAbility,
    args: T,
  ): T {
    const rightArgs = { ...args };

    const { include, select } = args;

    let join: 'include' | 'select' | undefined;

    if (include) join = 'include';
    if (select) join = 'select';

    let { roles, ...rest } = (join && args[join]) || {};

    if (typeof roles !== 'undefined') {
      const rolesArgs = typeof roles === 'boolean' ? {} : roles;

      roles = {
        ...rolesArgs,
        ...this.getRoleArgs(abilities, rolesArgs),

        where: {
          AND: [accessibleBy(abilities).Right, rolesArgs?.where || {}],
        },
      };
    }

    if (!join) return rightArgs;

    return {
      ...rightArgs,
      [join]: {
        ...rest,
        roles,
        ...(join === 'select' && this.defaultOwnershipSelect.Right),
      },
    };
  }
}
