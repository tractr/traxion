

import {
  Project,
} from 'ts-morph';

import { generateFilePath } from '../../utils/file.generator';

import { camel, Field, Model, pascal } from '@trxn/hapify-core';

export function generateTemplateSourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string,
) {

  const filePath: string = generateFilePath(model.name, field.name, 'component.html', path);

  const sourceFile = project.createSourceFile(filePath);

  const templateType = 'input'; // TODO: get template type from field type

  // TODO: retrieve the directive info from the field type
  const componentHtml = `<${projectScope}-${templateType}-${camel(field.name)}-ui
  [id]="id"
  [label]="label"
  [formControl]="control"
  [placeholder]="placeholder"
  ${projectScope}${pascal(model.name)}${pascal(field.name)} 
></${projectScope}-${templateType}-${camel(field.name)}-ui>`;

sourceFile.insertText(0, componentHtml);
}
