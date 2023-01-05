import { DMMF } from '@prisma/generator-helper';
import { camel, kebab, pascal } from 'case';
import {
  ClassDeclarationStructure,
  ImportDeclarationStructure,
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  Project,
  PropertyDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { containsUniqueFields, getModelUniqueFields } from '../helpers';

export function generateFindManyMethod(): MethodDeclarationStructure {
  return {
    kind: StructureKind.Method,
    name: 'findMany',
    decorators: [{ name: 'Get', arguments: [] }],
    statements: ['return this.state;'],
  };
}

export function generateCreateMethod(
  model: DMMF.Model,
): MethodDeclarationStructure {
  const dataParameter: ParameterDeclarationStructure = {
    kind: StructureKind.Parameter,
    name: 'data',
    decorators: [{ name: 'Body', arguments: [] }],
    type: `${pascal(model.name)}Dto`,
  };

  const statements = `
    ${
      containsUniqueFields(model) ? 'this.checkUniquenessConstraint(data);' : ''
    }
    this.state.push(data);
    return this.state;
  `;

  return {
    kind: StructureKind.Method,
    name: 'create',
    decorators: [{ name: 'Post', arguments: [] }],
    statements,
    parameters: [dataParameter],
  };
}

export function generateCheckUniquenessConstraintMethod(
  model: DMMF.Model,
): MethodDeclarationStructure {
  const dataParameter: ParameterDeclarationStructure = {
    kind: StructureKind.Parameter,
    name: 'data',
    type: `${pascal(model.name)}Dto`,
  };
  // Statements with a string array
  // const statements = [
  //   'this.uniqueFields.forEach(uniqueField => {',
  //   'const conflict = this.state.some(existingData => existingData[uniqueField] === data[uniqueField]);',
  //   'if (conflict) throw new ConflictException();',
  //   '})',
  // ];

  // Statements with a template literal
  const statements = `
  this.uniqueFields.forEach(uniqueField => {
    const conflict = this.state.some(existingData => existingData[uniqueField] === data[uniqueField]);
    if (conflict) throw new ConflictException();
  })
  `;

  // Statements with a writer function
  // const statements: WriterFunction = (writer) =>
  //   writer.write('this.uniqueFields.forEach(uniqueField =>').block(() => {
  //     writer
  //       .writeLine(
  //         'const conflict = this.state.some(existingData => existingData[uniqueField] === data[uniqueField]);',
  //       )
  //       .writeLine('if (conflict) throw new ConflictException();');
  //   });

  return {
    kind: StructureKind.Method,
    name: 'checkUniquenessConstraint',
    scope: Scope.Private,
    statements,
    parameters: [dataParameter],
  };
}

export function generateImports(
  model: DMMF.Model,
): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./${kebab(model.name)}.dto`,
      namedImports: [{ name: `${pascal(model.name)}Dto` }],
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@nestjs/common',
      namedImports: [
        { name: 'Controller' },
        { name: 'Get' },
        { name: 'Post' },
        { name: 'Req' },
        { name: 'Body' },
        { name: 'ConflictException' },
      ],
    },
  ];
}

export function generateStateProperty(
  model: DMMF.Model,
): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: 'state',
    scope: Scope.Private,
    initializer: '[]',
    type: `${pascal(model.name)}Dto[]`,
  };
}

export function generateUniqueFieldsProperty(
  model: DMMF.Model,
): PropertyDeclarationStructure {
  const uniqueFields = getModelUniqueFields(model).map(
    ({ name }) => `'${camel(name)}'`,
  );

  return {
    kind: StructureKind.Property,
    name: 'uniqueFields',
    scope: Scope.Private,
    initializer: `[${uniqueFields.join(',')}] as const`,
    isReadonly: true,
  };
}

export function generateControllerClass(
  model: DMMF.Model,
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
  path: string,
) {
  const fileName = `${kebab(model.name)}.controller.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const controllerClass = generateControllerClass(model);
  const controllerImports = generateImports(model);

  sourceFile.addImportDeclarations(controllerImports);
  sourceFile.addClass(controllerClass);
}
