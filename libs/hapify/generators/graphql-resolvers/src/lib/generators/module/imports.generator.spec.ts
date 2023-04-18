import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

describe('generateImports', () => {
  it('should generate import declarations for given models', () => {
    // Arrange
    const model: Model = {
      name: 'user',
      pluralName: '',
      fields: [],
      primaryKey: null,
    };

    const expectedImports: ImportDeclarationStructure[] = [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@nestjs/common',
        namedImports: [{ name: 'Module' }],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@trxn/nestjs-graphql',
        namedImports: [{ name: 'DateScalar' }],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './resolvers',
        namedImports: [{ name: 'UserResolver' }],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './graphql.module-definition',
        namedImports: [
          {
            name: `ConfigurableModuleClass`,
          },
        ],
      },
    ];

    // Act
    const result = generateImports([model]);

    // Assert
    expect(result).toEqual(expectedImports);
  });
});
