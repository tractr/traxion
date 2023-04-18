import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';

import { Model } from '@trxn/hapify-core';

describe('generateConstructor', () => {
  it('should generate constructor with two parameters', () => {
    // Arrange
    const model: Model = {
      name: 'user',
      pluralName: '',
      fields: [],
      primaryKey: null,
    };

    // Act
    const constructor: ConstructorDeclarationStructure =
      generateConstructor(model);

    // Assert
    expect(constructor).toBeDefined();
    expect(constructor?.kind).toEqual(StructureKind.Constructor);
    expect(constructor?.parameters).toHaveLength(2);

    const firstParameter = constructor?.parameters?.[0];
    expect(firstParameter?.kind).toEqual(StructureKind.Parameter);
    expect(firstParameter?.name).toEqual(`userService`);
    expect(firstParameter?.type).toEqual(`UserService`);
    expect(firstParameter?.scope).toEqual(Scope.Private);
    expect(firstParameter?.isReadonly).toEqual(true);
    expect(firstParameter?.decorators).toHaveLength(1);

    const secondParameter = constructor?.parameters?.[1];
    expect(secondParameter?.kind).toEqual(30);
    expect(secondParameter?.name).toEqual(`userDefaultService`);
    expect(secondParameter?.type).toEqual(`UserDefaultService`);
    expect(secondParameter?.scope).toEqual(Scope.Private);
    expect(secondParameter?.isReadonly).toEqual(true);
    expect(secondParameter?.decorators).toHaveLength(1);
  });
});
