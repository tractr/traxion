import { camel, pascal } from 'case';
import { Directory, Project } from 'ts-morph';

import {
  removeAllNestedCreateField,
  removeHiddenFieldFromOutput,
} from './generators';

import { isHiddenField, Schema } from '@trxn/hapify-core';

export function generate(project: Directory | Project, datamodel: Schema) {
  // Iterate over all class of the project
  project.getDirectories().forEach((directory) => {
    const model = datamodel.models.find(
      (m) => camel(m.name) === directory.getBaseName(),
    );

    if (!model) {
      return;
    }

    directory
      .getSourceFiles()
      .flatMap((sourceFile) => sourceFile.getClasses())
      .forEach((classDeclaration) => {
        const className = classDeclaration.getName();
        if (className?.includes('Nested') && className?.endsWith('Input')) {
          removeAllNestedCreateField(classDeclaration);
        }

        const hiddenFields = model.fields.filter(isHiddenField);

        if (
          className?.includes('Aggregate') ||
          className?.includes('GroupBy') ||
          className?.includes('OrderBy') ||
          className?.includes('WhereInput') ||
          className === pascal(model.name)
        ) {
          removeHiddenFieldFromOutput(classDeclaration, hiddenFields);
        }
      });
  });
}
