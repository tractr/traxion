import { camel } from 'case';
import {
  ImportDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import {
  Field,
  getRoleFieldFromUserModel,
  isForeignField,
  isPrimaryField,
  ModelWithOwnership,
  or,
} from '@trxn/hapify-core';

export function generateImports(): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@prisma/client`,
      namedImports: [{ name: `Prisma` }],
    },
  ];
}

export function createSelectClose(
  model: ModelWithOwnership,
  roleField?: Field | null,
): Record<string, unknown> {
  return {
    select: {
      ...model.fields
        .filter(
          or(
            isPrimaryField,
            isForeignField,
            (field): field is Field =>
              field.metadata?.defaultSelect === true ||
              roleField?.name === field.name,
          ),
        )
        .reduce(
          (acc, field) => ({
            ...acc,
            [camel(field.name)]: true,
          }),
          {},
        ),
      ...model.ownedModels.reduce(
        (acc, ownedModel) => ({
          ...acc,
          [ownedModel.relation.from.model.name === model.name
            ? ownedModel.relation.from.virtual.name
            : ownedModel.relation.to.virtual.name]: createSelectClose(
            ownedModel.own,
          ),
        }),
        {},
      ),
    },
  };
}

export function generateUserSelectWithOwnershipIdsSourceFile(
  project: Project,
  models: ModelWithOwnership,
  path: string,
) {
  const fileName = `user-select-ownership-ids.constant.ts`;
  const filePath = `${path}/constants/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  const roleField = getRoleFieldFromUserModel(models);

  sourceFile.addVariableStatement({
    kind: StructureKind.VariableStatement,
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'UserSelectOwnershipIds',
        initializer: `Prisma.validator<Prisma.UserArgs>()(
          ${JSON.stringify(createSelectClose(models, roleField), null, 2)}
        );`,
      },
    ],
  });

  sourceFile.addImportDeclarations(imports);
}
