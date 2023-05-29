import { camel, pascal } from 'case';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';

import { Model, ModelWithOwnership } from '@trxn/hapify-core';

export function getAllPathToIds(rootModel: ModelWithOwnership, model: Model) {
  const pathToIds: string[] = [];

  function getPathToIds(
    currentModel: ModelWithOwnership,
    [user, ...currentPath]: string[] = [],
  ) {
    if (currentModel.name === model.name) {
      pathToIds.push(
        [...currentPath, camel(model.primaryKey?.fields[0].name || '')].join(
          '.',
        ),
      );
    } else {
      currentModel.ownedModels.forEach((ownedModel) => {
        getPathToIds(ownedModel.own, [
          user,
          ...currentPath.concat(
            ownedModel.relation.from.virtual.name === currentModel.name
              ? ownedModel.relation.from.virtual.name
              : ownedModel.relation.to.virtual.name,
          ),
        ]);
      });
    }
  }

  getPathToIds(rootModel, []);

  return pathToIds;
}

export function addCanAction(
  actionName:
    | 'read'
    | 'create'
    | 'update'
    | 'delete'
    | 'search'
    | 'count'
    | 'manage',
  rootModel: ModelWithOwnership,
  model: Model,
): FunctionDeclarationStructure {
  const primaryKey = model.primaryKey?.fields[0];

  if (!primaryKey) {
    throw new Error(
      `Can't generate can${pascal(actionName)}Right for model ${
        model.name
      } because it has no primary key`,
    );
  }

  const path = getAllPathToIds(rootModel, model);

  return {
    kind: StructureKind.Function,
    name: `can${pascal(actionName)}${pascal(model.name)}`,
    parameters: [
      {
        name: 'abilities',
        type: 'AbilityBuilder<AppAbility>',
      },
      {
        name: 'user',
        type: 'UserWithOwnershipIds',
      },
    ],
    statements: [
      `abilities.can(Action.${pascal(actionName)}, '${pascal(
        model.name,
      )}', { ${camel(primaryKey.name)}: { in: [
        ${path
          .map(
            (p) =>
              `...getConcatValueByPath<${primaryKey.scalar}[]>('${p}', user)`,
          )
          .join(',\n')}
      ] } });`,
    ],
    isExported: true,
  };
}
