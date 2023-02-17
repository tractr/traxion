

import { plural } from 'pluralize';
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  Project,
  PropertyDeclarationStructure,
  StatementStructures,
  StructureKind,
  SyntaxKind,
  VariableDeclarationKind,
} from 'ts-morph';



import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';



export function generateTemplateSourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(
    plural(field.name),
  )}.component.html`;
  const filePath = `${path}/${kebab(model.name)}-${kebab(
    plural(field.name))}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const templateType = 'input'; // TODO: get template type from field type

  const componentHtml = `<${projectScope}-${templateType}-${camel(field.name)}-ui
  [id]="id"
  [label]="label"
  [formControl]="control"
  [placeholder]="placeholder"
  ${projectScope}${pascal(model.name)}${pascal(field.name)} // TODO: retrieve the directive
></${projectScope}-${templateType}-${camel(field.name)}-ui>`;

sourceFile.insertText(0, componentHtml);
}
