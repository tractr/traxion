import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';

describe('generateImports', () => {
  it('should generate import declarations', () => {
    // Arrange
    const expectedImports: ImportDeclarationStructure[] = [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@nestjs/common',
        namedImports: [{ name: 'ConfigurableModuleBuilder' }],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@trxn/nestjs-core',
        namedImports: [{ name: 'addImportsExtra' }, { name: 'ImportsExtra' }],
      },
    ];

    // Act
    const result = generateImports();

    // Assert
    expect(result).toEqual(expectedImports);
  });
});
