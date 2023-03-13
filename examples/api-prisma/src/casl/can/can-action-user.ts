import { AbilityBuilder, AnyAbility } from '@casl/ability';

import { UserWithOwnershipIds } from '../user.select';

import { Action } from '@trxn/nestjs-casl';

export function canReadUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'User', { id: user.id });
}
export function canSearchUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'User', { id: user.id });
}
export function canCountUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'User', { id: user.id });
}

export function canCreateUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'User', { id: user.id });
}
export function canUpdateUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'User', { id: user.id });
}
export function canDeleteUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'User', { id: user.id });
}

export function canReadActionUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
) {
  canReadUser(abilities, user);
  canSearchUser(abilities, user);
  canCountUser(abilities, user);
}
export function canWriteActionUser(
  abilities: AbilityBuilder<AnyAbility>,
  user: UserWithOwnershipIds,
  allowDelete = true,
) {
  canCreateUser(abilities, user);
  canUpdateUser(abilities, user);

  if (allowDelete) canDeleteUser(abilities, user);
}
