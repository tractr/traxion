import { AbilityBuilder } from '@casl/ability';

import {
  canReadActionsProfile,
  canReadActionsTask,
  canReadActionsUser,
  canWriteActionsProfile,
  canWriteActionsTask,
  canWriteActionsUser,
} from './can';
import { AppAbility, UserWithOwnershipIds } from './types';

/**
 * Minimal permissions for a connected user
 *
 * If an entity is owned by a user, the user can read, create and update it
 * else the user can only read it
 *
 * A direct owned model is a model that has a foreign key field linking to the user table
 *  -> this models can be automatically detected by the generator
 *
 * An indirect owned model is a model that has a foreign key field linking to a direct owned model or another indirect owned model
 * -> this models can be automatically detected by the generator
 *
 * You can add tag on prisma schema to configure the ownership of a model:
 *   - @trxn/permission:delete -> the user can read, write and delete the model
 *   - @trxn/permission:write -> the user can read and write the model
 *   - @trxn/permission:readonly -> the user can read the model
 *   - @trxn/permission:internal -> the user cannot read and write  the model
 *
 *   - @trxn/ownership:ignore -> Ignore the model and all its relations for the ownership detection
 *
 */
export function userOwnershipPermission(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  // User: the user own
  // -> default permission
  canReadActionsUser(abilities, user);
  // The user own the model, he can write on it
  canWriteActionsUser(abilities, user, false);

  // Profile: the user own
  // -> default permission
  canReadActionsProfile(abilities, user);
  // The user own the model, he can write on it
  canWriteActionsProfile(abilities, user, false);

  // Task: the user own
  // -> default permission
  canReadActionsTask(abilities, user);
  // The user own the model, he can write on it
  canWriteActionsTask(abilities, user, false);
}
