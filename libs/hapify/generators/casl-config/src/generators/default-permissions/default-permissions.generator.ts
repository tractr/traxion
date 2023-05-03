import { pascal } from 'case';
import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { Model } from '@trxn/hapify-core';

export function generateImports(model: Model[]): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@casl/ability`,
      namedImports: [{ name: `AbilityBuilder` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './types',
      namedImports: [{ name: `AppAbility` }, { name: `UserWithOwnershipIds` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './can',
      namedImports: [
        ...model.flatMap((m) => [
          { name: `canReadActions${pascal(m.name)}` },
          { name: `canWriteActions${pascal(m.name)}` },
        ]),
      ],
    },
  ];
}

export function generateUserDefaultPermissions(
  project: Project,
  model: Model[],
  path: string,
) {
  const fileName = `user-default-permissions.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations(generateImports(model));

  const userOwnershipPermission = sourceFile.addFunction({
    kind: StructureKind.Function,
    name: `userOwnershipPermission`,
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
      ...model.flatMap((m) => [
        `canReadActions${pascal(m.name)}(abilities, user);`,
        `canWriteActions${pascal(m.name)}(abilities, user);`,
      ]),
    ],
  });

  userOwnershipPermission.addJsDoc({
    description: `Minimal permissions for a connected user

This function is intended to be used by extended it in the project to compose your own permissions

It is intended to be used when your are not using the roles and write from the database

If an entity is owned by a user, the user can read, create and update it
else the user can only read it

A direct owned model is a model that has a foreign key field linking to the user table
 -> this models can be automatically detected by the generator

An indirect owned model is a model that has a foreign key field linking to a direct owned model or another indirect owned model
-> this models can be automatically detected by the generator

Hapify core need to know which models is the user model
`,
  });
}
