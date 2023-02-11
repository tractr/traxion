import { names } from '@nrwl/devkit';
import { JSDocStructure, OptionalKind, Project, StructureKind, TypeParameterDeclarationStructure, VariableDeclarationKind } from 'ts-morph';

import { Model, pascal, snake } from '@trxn/hapify-core';
import { generateImports } from './imports.generator';
import { addIndex } from '../../utils/add-index';
// import { generateImports } from './imports.generator';

export function generateInterfaceSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `models-services.interface.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);
  // const name = `${model.name.toUpperCase()}_SERVICES_PROVIDERS`;

  const imports = generateImports();
  sourceFile.addImportDeclarations(imports);

  const docs: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `The public interface of the ModelsServicesOptions.`,
    },
  ];
  const docProperties: JSDocStructure[] = [
    {
      kind: StructureKind.JSDoc,
      description: `Dynamic database module to use.`,
    },
  ];

  const interfaceDeclaration = sourceFile.addInterface({
    name: "ModelsServicesOptions",
    isExported: true,
    properties: [
      {
        name: "prismaClient",
        type: "PrismaClient",
        hasQuestionToken: true,
        docs: docProperties
      }
    ],
    docs
  });

  // generate index.ts
  const indexFile = `./models-services.interface`;
  const indexFilePath = `${path}/index.ts`;
  addIndex(project, indexFile, indexFilePath);
  
}
