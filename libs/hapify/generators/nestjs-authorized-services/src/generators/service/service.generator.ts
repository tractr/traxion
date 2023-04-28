import { kebab, pascal } from 'case';
import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateConstructor } from './constructor.generator';
import { generateImports } from './imports.generator';
import {
  generateCountMethod,
  generateCreateMethod,
  generateDeleteMethod,
  generateFindManyMethod,
  generateFindUniqueMethod,
  generateUpdateMethod,
} from './methods';

import { Model } from '@trxn/hapify-core';

export function generateServiceClass(model: Model): ClassDeclarationStructure {
  const className = `${pascal(model.name)}AuthorizedService`;
  const constructor = generateConstructor(model);

  const methods = [
    generateFindUniqueMethod(model),
    // generateFindManyMethod(model),
    // generateCreateMethod(model),
    // generateUpdateMethod(model),
    // generateDeleteMethod(model),
    // generateCountMethod(model),
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'Injectable()' }],
    methods,
    ctors: [constructor],
  };
}

export function generateServiceSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${kebab(model.name)}.service`;
  const filePath = `${path}/services/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const serviceClass = generateServiceClass(model);
  const imports = generateImports(model);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(serviceClass);
}
