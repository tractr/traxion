import { stubArray } from 'lodash';
import { Project, StructureKind, VariableDeclarationKind } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import {
  getRoleFieldFromUserModel,
  getUserModel,
  Schema,
} from '@trxn/hapify-core';
import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateCaslConfigSourceFile(
  project: Project,
  schema: Schema,
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

  // Here we need to validate the user model to have a field that hold the roles information
  const userModel = getUserModel(schema);
  const roleField = getRoleFieldFromUserModel(userModel);

  if (!roleField) {
    throw new Error(
      'The user model must have a field that hold the roles information',
    );
  }

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
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
        'UserSelectOwnershipIds',
        'UserWithOwnershipIds',
      ],
    },
  ]);

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'customSelect',
        initializer: `UserSelectOwnershipIds.select;`,
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
          string,
          DefinePermissions<AbilityBuilder<AppAbility>, UserWithOwnershipIds>
        >`,
        initializer: `{
          user: (abilities, user) => {
            userOwnershipPermission(abilities, user);
          },
          admin: (abilities) => {
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

  sourceFile.addFunction({
    kind: StructureKind.Function,
    isExported: true,
    name: 'getRoles',
    parameters: [
      {
        name: 'user',
        type: `UserWithOwnershipIds`,
      },
    ],
    statements: [`return user.${roleField.name};`],
  });
}
