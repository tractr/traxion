import { AbilityBuilder } from '@casl/ability';
import { AppAbility } from '../types/app-ability';
import { UserWithOwnershipIds } from '../types/user-with-ownership-ids';
import { getConcatValueByPath } from '@trxn/common';
import { Action } from '@trxn/nestjs-casl';
export function canReadTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Read, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canCountTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Count, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canSearchTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Search, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canCreateTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Create, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canUpdateTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Update, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canDeleteTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  abilities.can(Action.Delete, 'Task', {
    id: {
      in: [
        ...getConcatValueByPath<number[]>('author.id', user),
        ...getConcatValueByPath<number[]>('sharedTasks.id', user),
      ],
    },
  });
}

export function canReadActionsTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
) {
  canReadTask(abilities, user);
  canSearchTask(abilities, user);
  canCountTask(abilities, user);
}

export function canWriteActionsTask(
  abilities: AbilityBuilder<AppAbility>,
  user: UserWithOwnershipIds,
  allowDelete: boolean = false,
) {
  canCreateTask(abilities, user);
  canUpdateTask(abilities, user);
  if (allowDelete) canDeleteTask(abilities, user);
}
