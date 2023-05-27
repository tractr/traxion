import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateConstructor', () => {
  it('should generate constructor with two parameters', () => {
    // Arrange
    const id: PrimaryField = {
      name: 'id',
      type: 'primary',
      pluralName: 'ids',
      scalar: 'string',
      relations: [],
    };

    const model: Model = {
      name: 'User',
      pluralName: 'users',
      fields: [id],
      primaryKey: {
        name: 'id',
        fields: [id],
      },
      dbName: null,
    };

    // Act
    const constructor: ConstructorDeclarationStructure =
      generateConstructor(model);

    // Assert
    expect(constructor).toBeDefined();
    expect(constructor?.kind).toEqual(StructureKind.Constructor);
    expect(constructor?.parameters).toHaveLength(1);

    const firstParameter = constructor?.parameters?.[0];
    expect(firstParameter?.kind).toEqual(StructureKind.Parameter);
    expect(firstParameter?.name).toEqual(`userService`);
    expect(firstParameter?.type).toEqual(`UserService`);
    expect(firstParameter?.scope).toEqual(Scope.Private);
    expect(firstParameter?.isReadonly).toEqual(true);
    expect(firstParameter?.decorators).toHaveLength(0);
  });
});
