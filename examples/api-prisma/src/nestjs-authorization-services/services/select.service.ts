import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { MODULE_OPTIONS_TOKEN } from '../models-authorization-services.module-definition';
import { AuthorizationServicesModuleOptions } from '../types';

@Injectable()
export class SelectService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    protected readonly authorizationOptions: AuthorizationServicesModuleOptions,
  ) {}

  /**
   * Remove all the properties from data that are true in toRemove deeply
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

  getUserCaslSelect(userSelect: Prisma.UserArgs): {
    toRemove: Prisma.UserArgs;
    select: Prisma.UserArgs;
  } {
    const select = {
      select: this.authorizationOptions.defaultOwnershipIndexes.User,
    };

    // Retrieve the properties that are not in the userSelect but in the select
    const toRemove: Prisma.UserArgs = Object.keys(select.select)
      .filter((property) => !(property in userSelect))
      .reduce(
        (obj, key) => ({
          ...obj,
          select: {
            ...obj.select,
            [key]: true,
          },
        }),
        { select: {} } as Prisma.UserArgs,
      );

    if (
      userSelect.select?.role &&
      typeof userSelect.select.role !== 'boolean'
    ) {
      const role = this.getRoleCaslSelect(userSelect.select.role || {});
      select.select.role = role.select;
      toRemove.select = {
        ...toRemove.select,
        role: role.toRemove,
      };
    }

    return {
      toRemove,
      select,
    };
  }

  getRoleCaslSelect(roleSelect: Prisma.RoleArgs): {
    toRemove: Prisma.RoleArgs;
    select: Prisma.RoleArgs;
  } {
    const select = {
      select: this.authorizationOptions.defaultOwnershipIndexes.Role,
    };

    // Retrieve the properties that are not in the userSelect but in the select
    const toRemove: Prisma.RoleArgs = Object.keys(select.select)
      .filter((property) => !(property in roleSelect))
      .reduce(
        (obj, key) => ({
          ...obj,
          select: {
            ...obj.select,
            [key]: true,
          },
        }),
        { select: {} } as Prisma.RoleArgs,
      );

    if (
      roleSelect.select?.rights &&
      typeof roleSelect.select.rights !== 'boolean'
    ) {
      const right = this.getRightCaslSelect(roleSelect.select.rights || {});
      select.select.rights = right.select;
      toRemove.select = {
        ...toRemove.select,
        rights: right.select,
      };
    }

    return {
      toRemove,
      select,
    };
  }

  getRightCaslSelect(rightSelect: Prisma.RightArgs): {
    toRemove: Prisma.RightArgs;
    select: Prisma.RightArgs;
  } {
    const select = {
      select: this.authorizationOptions.defaultOwnershipIndexes.Right,
    };

    // Retrieve the properties that are not in the userSelect but in the select
    const toRemove: Prisma.RightArgs = Object.keys(select.select)
      .filter((property) => !(property in rightSelect))
      .reduce(
        (obj, key) => ({
          ...obj,
          select: {
            ...obj.select,
            [key]: true,
          },
        }),
        { select: {} } as Prisma.RightArgs,
      );

    if (
      rightSelect.select?.roles &&
      typeof rightSelect.select.roles !== 'boolean'
    ) {
      const role = this.getRoleCaslSelect(rightSelect.select.roles || {});
      select.select.roles = role.select;
      toRemove.select = {
        ...toRemove.select,
        roles: role.select,
      };
    }

    return {
      toRemove,
      select,
    };
  }
}
