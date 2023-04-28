import { AbilityBuilder } from '@casl/ability';

import {
  canReadActionRight,
  canReadActionRole,
  canReadActionUser,
  canWriteActionUser,
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
 */
export function userOwnershipPermission(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  // Model User: direct owned
  canReadActionUser(abilities, user);
  canWriteActionUser(abilities, user, true); // delete enable by @trxn/permission allowDelete

  // Model Role: user own the role
  canReadActionRole(abilities, user);
  // disable cause of @trxn/permission readOnly
  // canWriteActionRole(abilities, user, false);

  // Model Right: role own the right
  canReadActionRight(abilities, user);
  // disable cause of @trxn/permission readOnly
  // canWriteActionRight(abilities, user, false);

  // Model Tag: not owned
  // canReadActionTag(abilities, user);

  // Model Other: not owned
  // canReadActionOther(abilities, user);
  // enable cause of @trxn/permission write
  // canWriteActionOther(abilities, user, false);

  // Model Internal: not owned
  // disable cause of @trxn/permission internal
  // canReadActionInternal(abilities, user);
}
