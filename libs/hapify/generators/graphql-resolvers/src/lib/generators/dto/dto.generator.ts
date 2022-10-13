import { DMMF } from '@prisma/generator-helper';
import { camel, kebab, pascal } from 'case';
import {
  ClassDeclarationStructure,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { getFieldType, isEntityField } from '../../helpers';

function generateDtoProperties(
  field: DMMF.Field
): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: camel(field.name),
    hasExclamationToken: true,
    type: getFieldType(field),
  };
}

function generateDtoClass(model: DMMF.Model): ClassDeclarationStructure {
  const className = `${pascal(model.name)}Dto`;
  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    properties: model.fields
      .filter((field) => !isEntityField(field))
      .map((field) => generateDtoProperties(field)),
  };
}

export function generateCreateDtoSourceFile(
  project: Project,
  model: DMMF.Model,
  path: string
) {
  const fileName = `${kebab(model.name)}.dto.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const dtoClass = generateDtoClass(model);

  sourceFile.addClass(dtoClass);
  sourceFile.fixUnusedIdentifiers();
}
