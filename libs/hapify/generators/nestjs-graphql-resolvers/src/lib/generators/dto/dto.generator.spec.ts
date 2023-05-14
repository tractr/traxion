import { ClassDeclarationStructure, Project, StructureKind } from 'ts-morph';

import { generateDtoClass, generateDtoSourceFile } from './dto.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model } from '@trxn/hapify-core';

jest.mock('ts-morph');
describe('generateDtoClass', () => {
  it('should generate a DTO class for a given model', () => {
    // Arrange
    const model: Model = { name: 'user' } as Model;

    const expectedDtoClass: ClassDeclarationStructure = {
      kind: StructureKind.Class,
      name: 'FindManyUserOutput',
      isExported: true,
      decorators: [{ name: 'ObjectType', arguments: [] }],
      extends: 'FindManyPagination',
      properties: [
        {
          kind: StructureKind.Property,
          name: 'users',
          type: 'User[]',
          hasExclamationToken: true,
          decorators: [{ name: 'Field', arguments: ['() => [User]'] }],
        },
      ],
    };

    // Act
    const result = generateDtoClass(model);

    // Assert
    expect(result).toEqual(expectedDtoClass);
  });
});

describe('generateDtoSourceFile', () => {
  it('should create a source file and add imports and class', () => {
    // Arrange
    const project = new Project();
    const model: Model = { name: 'user' } as Model;
    const path = './src';
    const importPaths: GraphqlResolverImportPathConfig = {
      nestjsServices: '',
      graphqlDtos: '',
    }; // Define importPaths if necessary

    const sourceFileMock = {
      addImportDeclarations: jest.fn(),
      addClass: jest.fn(),
    };

    (project.createSourceFile as jest.Mock).mockReturnValue(sourceFileMock);

    // Act
    generateDtoSourceFile(project, model, path, importPaths);

    // Assert
    expect((project.createSourceFile as jest.Mock).mock.calls[0][0]).toEqual(
      `${path}/dtos/find-many-user-output.dto.ts`,
    );
    expect(sourceFileMock.addImportDeclarations).toHaveBeenCalled();
    expect(sourceFileMock.addClass).toHaveBeenCalled();
  });
});
