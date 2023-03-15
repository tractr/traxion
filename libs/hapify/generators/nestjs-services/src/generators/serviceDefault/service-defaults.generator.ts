import { kebab, pascal } from 'case';
import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateDefaultInternalsMethod } from './default-internals-method.generator';
import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

export function generateServiceDefaultClass(
  model: Model,
): ClassDeclarationStructure {
  const className = `${pascal(model.name)}DefaultService`;

  const methods = [...generateDefaultInternalsMethod()];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'Injectable()' }],
    methods,
    ctors: [],
  };
}

export function generateServiceDefaultSourceFile(
  project: Project,
  model: Model,
  path: string,
) {
  const fileName = `${kebab(model.name)}-default.service`;
  const filePath = `${path}/services/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const serviceClass = generateServiceDefaultClass(model);
  const imports = generateImports();

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(serviceClass);
}
