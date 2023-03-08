import { JSDocStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

export function generateInterfaceSourceFile(project: Project, path: string) {
  const fileName = `models-services.interface.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath, undefined, {
    overwrite: true,
  });

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

  sourceFile.addInterface({
    name: 'ModelsServiceModuleOptions',
    isExported: true,
    // properties: [ // TODO: delete after testing
    //   {
    //     name: 'prismaClient',
    //     type: 'PrismaClient',
    //     hasQuestionToken: true,
    //     docs: docProperties,
    //   },
    // ],
    docs,
  });
}
