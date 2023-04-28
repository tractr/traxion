import { StructureKind } from 'ts-morph';

import { generateUpdateMethod } from './update-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateUpdateMethod', () => {
  it('generates a valid update method for a model', () => {
    const model: Model = {
      name: 'User',
      fields: [],
      pluralName: '',
      primaryKey: null,
    };

    const methodDeclaration = generateUpdateMethod(model);

    // Check function name
    expect(methodDeclaration.name).toBe('update');

    // Check parameters
    expect(methodDeclaration.parameters).toHaveLength(2);
    expect(methodDeclaration.parameters?.[0].name).toBe('args');
    expect(methodDeclaration.parameters?.[0].type).toBe(
      `Prisma.SelectSubset<T, Prisma.UserUpdateArgs>`,
    );
    expect(methodDeclaration.parameters?.[1].initializer).toBe(
      `this.prismaClient.user`,
    );

    // Check type parameters
    expect(methodDeclaration.typeParameters).toEqual([
      {
        name: 'T',
        kind: StructureKind.TypeParameter,
        constraint: `Prisma.UserUpdateArgs`,
      },
    ]);

    // Check return type
    expect(methodDeclaration.statements).toBe(`return prisma.update<T>(args);`);

    // TODO : a check for description ? see with Max
  });
});
