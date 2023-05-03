import { kebab, pascal } from 'case';
import { Project, StructureKind } from 'ts-morph';

import { addCanAction } from './add-can-action';
import { generateImports } from './imports.generator';

import { Model, ModelWithOwnership } from '@trxn/hapify-core';
import { Action } from '@trxn/nestjs-casl';

export function generateCanSourceFile(
  project: Project,
  rootModel: ModelWithOwnership,
  model: Model,
  path: string,
) {
  const modelSnake = kebab(model.name);
  const fileName = `${modelSnake}.can.ts`;
  const filePath = `${path}/can/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  sourceFile.addImportDeclarations(imports);

  const statements = [
    addCanAction(Action.Read, rootModel, model),
    addCanAction(Action.Count, rootModel, model),
    addCanAction(Action.Search, rootModel, model),
    addCanAction(Action.Create, rootModel, model),
    addCanAction(Action.Update, rootModel, model),
    addCanAction(Action.Delete, rootModel, model),
  ];
  sourceFile.addStatements(statements);

  sourceFile.addFunction({
    kind: StructureKind.Function,
    name: `canReadActions${pascal(model.name)}`,
    isExported: true,
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
      `canRead${pascal(model.name)}(abilities, user);`,
      `canSearch${pascal(model.name)}(abilities, user);`,
      `canCount${pascal(model.name)}(abilities, user);`,
    ],
  });

  sourceFile.addFunction({
    kind: StructureKind.Function,
    name: `canWriteActions${pascal(model.name)}`,
    isExported: true,
    parameters: [
      {
        name: 'abilities',
        type: 'AbilityBuilder<AppAbility>',
      },
      {
        name: 'user',
        type: 'UserWithOwnershipIds',
      },
      {
        name: 'allowDelete',
        type: 'boolean',
        initializer: 'false',
      },
    ],
    statements: [
      `canCreate${pascal(model.name)}(abilities, user);`,
      `canUpdate${pascal(model.name)}(abilities, user);`,
      `if (allowDelete) canDelete${pascal(model.name)}(abilities, user);`,
    ],
  });
}
