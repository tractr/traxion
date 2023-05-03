import { AbilityBuilder } from '@casl/ability';

import {
  canReadActionsRight,
  canReadActionsRole,
  canReadActionsUser,
  canWriteActionsRight,
  canWriteActionsRole,
  canWriteActionsUser,
} from './can';
import { AppAbility, UserWithOwnershipIds } from './types';

/**
 * Minimal permissions for a connected user
 *
 * This function is intended to be used by extended it in the project to compose your own permissions
 *
 * It is intended to be used when your are not using the roles and write from the database
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
 * Hapify core need to know which models is the user model
 *
 */
export function userOwnershipPermission(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadActionsUser(abilities, user);
  canWriteActionsUser(abilities, user);
  canReadActionsRole(abilities, user);
  canWriteActionsRole(abilities, user);
  canReadActionsRight(abilities, user);
  canWriteActionsRight(abilities, user);
}
