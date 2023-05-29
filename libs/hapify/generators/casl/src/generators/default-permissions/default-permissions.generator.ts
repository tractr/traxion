import { pascal } from 'case';
import { ImportDeclarationStructure, Project, StructureKind } from 'ts-morph';

import {
  getPermissionLevel,
  isModelOwned,
  Model,
  ModelWithOwnership,
} from '@trxn/hapify-core';

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
  rootModel: ModelWithOwnership,
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
      ...model.flatMap((m) => {
        const owned = isModelOwned(rootModel, m);
        const permission = getPermissionLevel(m);
        switch (permission) {
          case 'allowDelete':
            return [
              `// ${m.name}: the user ${owned ? 'own' : "doesn't own"}`,
              `// -> ${permission} permission`,
              `canReadActions${pascal(m.name)}(abilities, user);`,
              `canWriteActions${pascal(m.name)}(abilities, user, true);`,
              '',
            ];
          case 'write':
            return [
              `// ${m.name}: the user ${owned ? 'own' : "doesn't own"}`,
              `// -> ${permission} permission`,
              `canReadActions${pascal(m.name)}(abilities, user);`,
              `canWriteActions${pascal(m.name)}(abilities, user, false);`,
              '',
            ];
          case 'readOnly':
            return [
              `// ${m.name}: the user ${owned ? 'own' : "doesn't own"}`,
              `// -> ${permission} permission`,
              `canReadActions${pascal(m.name)}(abilities, user);`,
              `// disabled cause of the read permission`,
              `// canWriteActions${pascal(m.name)}(abilities, user, true);`,
              '',
            ];
          case 'internal':
            return [
              `// ${m.name}: the user ${owned ? 'own' : "doesn't own"}`,
              `// -> ${permission} permission`,
              `// disabled cause of the internal permission`,
              `// canReadActions${pascal(m.name)}(abilities, user);`,
              `// canWriteActions${pascal(m.name)}(abilities, user, true);`,
              '',
            ];
          case 'unknown':
          case 'default':
            return [
              `// ${m.name}: the user ${owned ? 'own' : "doesn't own"}`,
              `// -> ${permission} permission ${
                permission === 'unknown'
                  ? ` the permission ${
                      m.metadata?.permission as string
                    } is unknown, default back on default permission`
                  : ''
              }`,
              `canReadActions${pascal(m.name)}(abilities, user);`,
              ...(isModelOwned(rootModel, m)
                ? [
                    '// The user own the model, he can write on it',
                    `canWriteActions${pascal(m.name)}(abilities, user, false);`,
                  ]
                : ["// The user doesn't own the model, he can't write on it"]),
              '',
            ];
          default:
            return [];
        }
      }),
    ],
  });

  userOwnershipPermission.addJsDoc({
    description: `Minimal permissions for a connected user

If an entity is owned by a user, the user can read, create and update it
else the user can only read it

A direct owned model is a model that has a foreign key field linking to the user table
 -> this models can be automatically detected by the generator

An indirect owned model is a model that has a foreign key field linking to a direct owned model or another indirect owned model
-> this models can be automatically detected by the generator

You can add tag on prisma schema to configure the ownership of a model:
  - @trxn/permission:allowDelete -> the user can read, write and delete the model
  - @trxn/permission:write -> the user can read and write the model
  - @trxn/permission:readonly -> the user can read the model
  - @trxn/permission:internal -> the user cannot read and write  the model

  - @trxn/ownership:ignore -> Ignore the model and all its relations for the ownership detection
`,
  });
}
