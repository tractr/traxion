import { DataSource } from '@prisma/generator-helper';
import { kebab, pascal } from 'case';
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  Project,
  StructureKind,
} from 'ts-morph';

import { generateAggregateMethod } from './aggregate-method.generator';
import { generateConstructor } from './constructor.generator';
import { generateCountMethod } from './count-method.generator';
import { generateCreateManyMethod } from './create-many-method.generator';
import { generateCreateMethod } from './create-method.generator';
import { generateDeleteManyMethod } from './delete-many-method.generator';
import { generateDeleteMethod } from './delete-method.generator';
import { generateEncryptFieldsGenerator } from './encrypt-fields.generator';
import { generateExcludeHiddenFieldGenerator } from './exclude-hidden-fields.generator';
import { generateFindFirstMethod } from './find-first-method.generator';
import { generateFindManyMethod } from './find-many-method.generator';
import { generateFindUniqueMethod } from './find-unique-method.generator';
import { generateImports } from './imports.generator';
import { generateUpdateManyMethod } from './update-many-method.generator';
import { generateUpdateMethod } from './update-method.generator';
import { generateUpsertMethod } from './upsert-method.generator';

import { isEncryptedField, isHiddenField, Model } from '@trxn/hapify-core';

export function generateServiceClass(
  model: Model,
  datasources: DataSource[],
): ClassDeclarationStructure {
  const { dbName } = model;

  const datasource =
    datasources.find((d) => d.name === dbName) || datasources[0];

  const className = `${pascal(model.name)}Service`;
  const constructor = generateConstructor(model);

  const methods: MethodDeclarationStructure[] = [
    generateFindUniqueMethod(model),
    generateFindFirstMethod(model),
    generateFindManyMethod(model),
    generateCreateMethod(model),
    datasource.activeProvider !== 'sqlite'
      ? generateCreateManyMethod(model)
      : undefined,
    generateUpdateMethod(model),
    generateUpdateManyMethod(model),
    generateUpsertMethod(model),
    generateDeleteMethod(model),
    generateDeleteManyMethod(model),
    generateCountMethod(model),
    generateAggregateMethod(model),
  ].filter((m): m is MethodDeclarationStructure => m !== undefined);

  const hasHidden = model.fields.filter(isHiddenField).length > 0;
  if (hasHidden) {
    methods.unshift(generateExcludeHiddenFieldGenerator(model));
  }

  const hasEncrypted = model.fields.filter(isEncryptedField).length > 0;
  if (hasEncrypted) {
    methods.unshift(generateEncryptFieldsGenerator(model));
  }

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
  datasources: DataSource[],
  path: string,
) {
  const fileName = `${kebab(model.name)}.service`;
  const filePath = `${path}/services/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const serviceClass = generateServiceClass(model, datasources);
  const imports = generateImports(model);

  sourceFile.addImportDeclarations(imports);
  sourceFile.addClass(serviceClass);
}
