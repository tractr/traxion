import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

export function generateModuleClass(): ClassDeclarationStructure {
  const className = `ModelsServicesModules`;

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    extends: `ConfigurableModuleClass`,
    decorators: [
      {
        name: `Module({
      providers: MODELS_SERVICES_PROVIDERS,
      exports: MODELS_SERVICES_PROVIDERS,
    })`,
      },
    ],
  };
}

export function generateUserOwnershipSourceFile(project: Project, path: string) {
  const fileName = `user-with-ownership-ids.ts`;
  const filePath = `types/${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const imports = generateImports();

  /**
 * User export type that the userService.findUnique method will return
 * by the getSelectPrismaUserQuery function
 */
// export type UserWithOwnershipIds = Prisma.UserGetPayload<
//   typeof UserSelectOwnershipIds
// >;

const typeAlias = sourceFile.addTypeAlias({
    name: "UserWithOwnershipIds",
    isExported: true,
    type: `Prisma.UserGetPayload<
    typeof UserSelectOwnershipIds
  >;`,
  
    });

    typeAlias.addJsDoc({
      description:
        "User export type that the userService.findUnique method will return by the getSelectPrismaUserQuery function",
    });

  sourceFile.addImportDeclarations(imports);
}

