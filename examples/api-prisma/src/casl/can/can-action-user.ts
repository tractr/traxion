import { AbilityBuilder } from '@casl/ability';

import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';

import { Action } from '@trxn/nestjs-casl';

export function canReadUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'User', { id: user.id });
}
export function canSearchUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'User', { id: user.id });
}
export function canCountUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'User', { id: user.id });
}

export function canCreateUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'User', { id: user.id });
}
export function canUpdateUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'User', { id: user.id });
}
export function canDeleteUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'User', { id: user.id });
}

export function canReadActionUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadUser(abilities, user);
  canSearchUser(abilities, user);
  canCountUser(abilities, user);
}
export function canWriteActionUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete = true,
) {
  canCreateUser(abilities, user);
  canUpdateUser(abilities, user);

  if (allowDelete) canDeleteUser(abilities, user);
}
