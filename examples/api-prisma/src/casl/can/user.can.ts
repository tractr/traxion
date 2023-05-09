import { AbilityBuilder } from '@casl/ability';

import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';

import { getConcatValueByPath } from '@trxn/common';
import { Action } from '@trxn/nestjs-casl';

export function canReadUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canCountUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canSearchUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canCreateUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canUpdateUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canDeleteUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'User', {
    id: { in: [...getConcatValueByPath<number[]>('user.id', user)] },
  });
}

export function canReadActionsUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadUser(abilities, user);
  canSearchUser(abilities, user);
  canCountUser(abilities, user);
}

export function canWriteActionsUser(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete = false,
) {
  canCreateUser(abilities, user);
  canUpdateUser(abilities, user);
  if (allowDelete) canDeleteUser(abilities, user);
}
