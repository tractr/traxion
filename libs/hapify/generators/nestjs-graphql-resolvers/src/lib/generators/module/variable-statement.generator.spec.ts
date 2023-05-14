import { StructureKind, VariableDeclarationKind } from 'ts-morph';

import { generateProvidersVariableStatement } from './variable-statement.generator';

import { Model } from '@trxn/hapify-core';

describe('generateProvidersVariableStatement', () => {
  it('should generate a providers variable statement', () => {
    // Arrange
    const models: Model[] = [
      { name: 'user' } as Model,
      { name: 'post' } as Model,
    ];

    const expectedVariableStatement = {
      kind: StructureKind.VariableStatement,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: 'providers',
          initializer: `[
  DateScalar,
  UserResolver,PostResolver
]`,
        },
      ],
    };

    // Act
    const result = generateProvidersVariableStatement(models);

    // Assert
    expect(result).toEqual(expectedVariableStatement);
  });
});
