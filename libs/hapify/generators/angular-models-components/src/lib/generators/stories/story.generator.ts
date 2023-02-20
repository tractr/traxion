import { plural } from 'pluralize';
import {
  ExportAssignmentStructure,
  ImportDeclarationStructure,
  OptionalKind,
  Project,
  VariableDeclarationKind,
} from 'ts-morph';

import { generateImport } from '../../utils/import.generator';

import { Field, kebab, lower, Model, pascal } from '@trxn/hapify-core';
import { generateFilePath } from '../../utils/file.generator';

export function generateStorySourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string
) {

  const filePath: string = generateFilePath(model.name, field.name, 'stories.ts', path);

  const sourceFile = project.createSourceFile(filePath);

  const imports: OptionalKind<ImportDeclarationStructure>[] = [
    generateImport('@storybook/angular', ['Meta', 'Story']),
    generateImport(`./${kebab(model.name)}-${kebab(field.name)}.component`, [
      `${pascal(model.name)}${pascal(field.name)}Component`,
    ]),
  ];

  const exportStatement: OptionalKind<ExportAssignmentStructure> = {
    isExportEquals: false,
    expression: `{
  title: "'Models Component/${pascal(model.name)}/${pascal(
      plural(field.name),
    )}'",
  component: '${pascal(model.name)}${pascal(plural(field.name))}Component',
} as Meta<${pascal(model.name)}${pascal(plural(field.name))}Component>`,
  };

  sourceFile.addExportAssignment(exportStatement);

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'Template',
        initializer: `(args: ${pascal(model.name)}${pascal(
          field.name,
        )}Component) => ({
  props: args,
})`,
type: `Story<${pascal(model.name)}${pascal(plural(field.name))}Component>`,
      },
    ],
  });

  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: `Emptied${pascal(field.name)}`,
        initializer: `Template.bind({
          args: {
            placeholder: ""
          }
        })`,
      },
    ],
  });

  // add the args property
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    isExported: true,
    declarations: [
      {
        name: `Filled${pascal(field.name)}`,
        initializer: `Template.bind({
          args: {
            placeholder: "not empty"
          }
        })`,
      },
    ],
  });

  // // add the args property
  // constFilled.addDeclaration({
  //   name: 'args',
  //   initializer: '{ placeholder: "not empty" }',
  // });

  sourceFile.addImportDeclarations(imports);
}
