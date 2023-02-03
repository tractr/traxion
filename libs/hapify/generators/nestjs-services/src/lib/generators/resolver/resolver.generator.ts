import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

import { camel, Model, pascal, snake } from '@trxn/hapify-core';
import { generateConstructor } from './constructor.generator';


export function generateResolverClass(model: Model): ClassDeclarationStructure {
   const className = `${pascal(model.name)}Service`;
    const constructor = generateConstructor(model);

   const methods = [
  //   generateFindUniqueMethod(model),
  //   generateFindManyMethod(model),
  //   generateCreateMethod(model),
  //   generateUpdateMethod(model),
  //   generateDeleteMethod(model),
  //   ...generateFieldResolvers(model),
   ];

   return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [
      { name: 'Injectable' },
    ],
    // methods,
    ctors: [constructor],
  };
}

export function generateResolverSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${snake(model.name)}.service.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

   const resolverClass = generateResolverClass(model);
  const imports = generateImports(model);
  // const method = generatePrismaSelectMethod(model);
  // sourceFile.addFunction(method);
  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(resolverClass);
}
