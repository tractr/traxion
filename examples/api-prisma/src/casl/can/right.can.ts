import { AbilityBuilder } from '@casl/ability';

import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';

import { getConcatValueByPath } from '@trxn/common';
import { Action } from '@trxn/nestjs-casl';

export function canReadRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canCountRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canSearchRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canCreateRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canUpdateRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canDeleteRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'Right', {
    id: { in: [...getConcatValueByPath<number[]>('role.rights.id', user)] },
  });
}

export function canReadActionsRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadRight(abilities, user);
  canSearchRight(abilities, user);
  canCountRight(abilities, user);
}

export function canWriteActionsRight(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete = false,
) {
  canCreateRight(abilities, user);
  canUpdateRight(abilities, user);
  if (allowDelete) canDeleteRight(abilities, user);
}
