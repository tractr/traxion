import { AbilityBuilder } from '@casl/ability';
import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';
import { getConcatValueByPath } from '@trxn/common';
import { Action } from '@trxn/nestjs-casl';
export function canReadProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canCountProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canSearchProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canCreateProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canUpdateProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canDeleteProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'Profile', {
    id: { in: [...getConcatValueByPath<number[]>('user.user.id', user)] },
  });
}

export function canReadActionsProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadProfile(abilities, user);
  canSearchProfile(abilities, user);
  canCountProfile(abilities, user);
}

export function canWriteActionsProfile(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete: boolean = false,
) {
  canCreateProfile(abilities, user);
  canUpdateProfile(abilities, user);
  if (allowDelete) canDeleteProfile(abilities, user);
}
