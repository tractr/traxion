import {
  ClassDeclarationStructure,
  Project,
  StructureKind,
  VariableDeclarationKind,
} from 'ts-morph';

import {
  generateModuleClass,
  generateModuleSourceFile,
} from './module.generator';
import { generateProvidersVariableStatement } from './variable-statement.generator';

import { Model } from '@trxn/hapify-core';

describe('generateModuleClass', () => {
  it('should generate a module class', () => {
    // Arrange
    const expectedClass: ClassDeclarationStructure = {
      kind: StructureKind.Class,
      name: 'GraphqlModule',
      isExported: true,
      extends: 'ConfigurableModuleClass',
      decorators: [
        {
          name: 'Module',
          arguments: [`{ providers: providers, exports: providers }`],
        },
      ],
    };

    // Act
    const result = generateModuleClass();

    // Assert
    expect(result).toEqual(expectedClass);
  });
});

jest.mock('ts-morph');

describe('generateModuleSourceFile', () => {
  it('should create a source file and add imports, variable statement, and class', () => {
    // Arrange
    const project = new Project();
    const models: Model[] = [
      { name: 'user' } as Model,
      { name: 'post' } as Model,
    ];
    const path = './src';

    const sourceFileMock = {
      addImportDeclarations: jest.fn(),
      addVariableStatement: jest.fn(),
      addClass: jest.fn(),
    };

    (project.createSourceFile as jest.Mock).mockReturnValue(sourceFileMock);

    // Act
    generateModuleSourceFile(project, models, path);

    // Assert
    expect((project.createSourceFile as jest.Mock).mock.calls[0][0]).toEqual(
      `${path}/graphql.module.ts`,
    );
    expect(sourceFileMock.addImportDeclarations).toHaveBeenCalled();
    expect(sourceFileMock.addVariableStatement).toHaveBeenCalled();
    expect(sourceFileMock.addClass).toHaveBeenCalled();
  });
});
