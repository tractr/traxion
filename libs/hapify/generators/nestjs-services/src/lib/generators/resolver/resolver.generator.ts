import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateAggregateMethod } from './aggregate-method.generator';
import { generateConstructor } from './constructor.generator';
import { generateCountMethod } from './count-method.generator';
import { generateCreateManyMethod } from './create-many-method.generator';
import { generateCreateMethod } from './create-method.generator';
import { generateDefaultInternalsMethod } from './default-internals-method.generator';
import { generateDeleteManyMethod } from './delete-many-method.generator';
import { generateDeleteMethod } from './delete-method.generator';
import { generateFindFirstMethod } from './find-first-method.generator';
import { generateFindManyMethod } from './find-many-method.generator';
import { generateFindUniqueMethod } from './find-unique-method.generator';
import { generateImports } from './imports.generator';
import { generateUpdateManyMethod } from './update-many-method.generator';
import { generateUpdateMethod } from './update-method.generator';
import { generateUpsertMethod } from './upsert-method.generator';

import { Model, pascal, snake } from '@trxn/hapify-core';


export function generateResolverClass(model: Model): ClassDeclarationStructure {
  const className = `${pascal(model.name)}Service`;
  const constructor = generateConstructor(model);

  const methods = [
    ...generateDefaultInternalsMethod(),
    generateFindUniqueMethod(model),
    generateFindFirstMethod(model),
    generateFindManyMethod(model),
    generateCreateMethod(model),
    generateCreateManyMethod(model),
    generateUpdateMethod(model),
    generateUpdateManyMethod(model),
    generateUpsertMethod(model),
    generateDeleteMethod(model),
    generateDeleteManyMethod(model),
    generateCountMethod(model),
    generateAggregateMethod(model)
  ];

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [
      { name: 'Injectable()' },
    ],
    methods,
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

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(resolverClass);
}
