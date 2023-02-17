import { plural } from 'pluralize';
import {
  ClassDeclarationStructure,
  ExportAssignmentStructure,
  ImportDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
  SyntaxKind,
  VariableDeclaration,
  VariableDeclarationKind,
} from 'ts-morph';

import { camel, Field, kebab, Model, pascal } from '@trxn/hapify-core';
import { generateImport } from '../../utils/import.generator';

export function generateStorySourceFile(
  project: Project,
  model: Model,
  field: Field,
  path: string,
  projectScope: string,
) {
  const fileName = `${kebab(model.name)}-${kebab(
    plural(field.name),
  )}.stories.ts`;
  const filePath = `${path}/${kebab(model.name)}-${kebab(
    plural(field.name),
  )}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);


  const imports: OptionalKind<ImportDeclarationStructure>[] = [
    generateImport('@storybook/angular', ['Meta', 'Story']),
    generateImport(
      `./${kebab(model.name)}-${kebab(plural(field.name))}.component`,
      [`${pascal(model.name)}${pascal(plural(field.name))}Component`],
    ),
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



  const constEmpty = sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'EmptyRoles',
        initializer: 'Template.bind({})',
      },
    ],
  });
  // add the args property
  constEmpty.addDeclaration({
    name: 'args',
    initializer: '{ placeholder: "" }',
  });

  const constFilled = sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'EmptyRoles',
        initializer: 'Template.bind({})',
      },
    ],
  });

  // add the args property
  constFilled.addDeclaration({
    name: 'args',
    initializer: '{ placeholder: "not empty" }',
  });

  sourceFile.addExportAssignment(exportStatement);
  sourceFile.addImportDeclarations(imports);
}
