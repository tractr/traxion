import { AbilityBuilder } from '@casl/ability';

import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';

import { Action } from '@trxn/nestjs-casl';

export function getAllRightIds(user: UserWithOwnershipIds) {
  return user.role.rights.map((right) => right.id);
}

export function canReadRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'Right', { id: { in: getAllRightIds(user) } });
}
export function canSearchRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'Right', { id: { in: getAllRightIds(user) } });
}
export function canCountRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'Right', { id: { in: getAllRightIds(user) } });
}

export function canCreateRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'Right', { id: { in: getAllRightIds(user) } });
}
export function canUpdateRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'Right', { id: { in: getAllRightIds(user) } });
}
export function canDeleteRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'Right', { id: { in: getAllRightIds(user) } });
}

export function canReadActionRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadRight(abilities, user);
  canSearchRight(abilities, user);
  canCountRight(abilities, user);
}
export function canWriteActionRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete = true,
) {
  canCreateRight(abilities, user);
  canUpdateRight(abilities, user);

  if (allowDelete) canDeleteRight(abilities, user);
}
