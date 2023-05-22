import { Project, StructureKind, VariableDeclarationKind } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateCaslConfigSourceFile(
  project: Project,
  path: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `casl.config.ts`;
  const filePath = `${path}/configs/${fileName}`;

  const { casl } = importPaths;

  if (!casl) {
    throw new Error(
      'casl import path is required when no casl config is provided',
    );
  }

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@prisma/client',
      namedImports: ['Prisma', 'Role'],
    },
    {
      moduleSpecifier: '@casl/ability',
      namedImports: ['AbilityBuilder'],
    },
    {
      moduleSpecifier: '@trxn/nestjs-casl',
      namedImports: ['Action', 'DefinePermissions', 'DefinePublicPermissions'],
    },
    {
      moduleSpecifier: resolveDynamicPath(casl, '../..'),
      namedImports: [
        'AppAbility',
        'userOwnershipPermission',
        {
          name: 'UserSelectOwnershipIds',
          alias: 'userSelect',
        },
      ],
    },
  ]);

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'userSelectWithOwnership',
        initializer: `Prisma.validator<Prisma.UserArgs>()({
          select: {
            ...userSelect.select,
            roles: true,
          },
        });`,
      },
    ],
  });

  sourceFile.addTypeAlias({
    name: 'UserWithOwnershipIds',
    isExported: true,
    type: `Prisma.UserGetPayload<typeof userSelectWithOwnership>;`,
  });

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'customSelect',
        initializer: `userSelectWithOwnership.select;`,
      },
    ],
  });

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'rolePermissions',
        type: `Record<
          Role,
          DefinePermissions<AbilityBuilder<AppAbility>, UserWithOwnershipIds>
        >`,
        initializer: `{
          USER: (abilities, user) => {
            userOwnershipPermission(abilities, user);
          },
          ADMIN: (abilities) => {
            abilities.can(Action.Manage, 'all');
          },
        }`,
      },
    ],
  });

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'publicPermissions',
        type: `DefinePublicPermissions<
          AbilityBuilder<AppAbility>
        >`,
        initializer: `() => {
          // Public has not right
        }`,
      },
    ],
  });
}
