import { AbilityBuilder } from '@casl/ability';

import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';

import { getConcatValueByPath } from '@trxn/common';
import { Action } from '@trxn/nestjs-casl';

export function canReadRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canCountRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canSearchRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canCreateRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canUpdateRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canDeleteRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'Role', {
    id: { in: [...getConcatValueByPath<number[]>('user.role.id', user)] },
  });
}

export function canReadActionsRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadRole(abilities, user);
  canSearchRole(abilities, user);
  canCountRole(abilities, user);
}

export function canWriteActionsRole(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete = false,
) {
  canCreateRole(abilities, user);
  canUpdateRole(abilities, user);
  if (allowDelete) canDeleteRole(abilities, user);
}
