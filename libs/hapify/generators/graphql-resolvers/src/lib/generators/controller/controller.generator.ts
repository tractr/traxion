import { DMMF } from '@prisma/generator-helper';
import { kebab, pascal } from 'case';
import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { containsUniqueFields } from '../../helpers';
import {
  generateCheckUniquenessConstraintMethod,
  generateCreateMethod,
  generateFindManyMethod,
  generateImports,
  generateStateProperty,
  generateUniqueFieldsProperty,
} from './helpers.generator';

export function generateControllerClass(
  model: DMMF.Model
): ClassDeclarationStructure {
  const className = `${pascal(model.name)}Controller`;
  const properties = [
    generateStateProperty(model),
    ...(containsUniqueFields(model)
      ? [generateUniqueFieldsProperty(model)]
      : []),
  ];
  const methods = [
    generateCreateMethod(model),
    generateFindManyMethod(),
    ...(containsUniqueFields(model)
      ? [generateCheckUniquenessConstraintMethod(model)]
      : []),
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [
      { name: 'Controller', arguments: [`['${kebab(model.name)}']`] },
    ],
    properties,
    methods,
  };
}

export function generateControllerSourceFile(
  project: Project,
  model: DMMF.Model,
  path: string
) {
  const fileName = `${kebab(model.name)}.controller.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const controllerClass = generateControllerClass(model);
  const controllerImports = generateImports(model);

  sourceFile.addImportDeclarations(controllerImports);
  sourceFile.addClass(controllerClass);
}
