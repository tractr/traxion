import { StructureKind } from 'ts-morph';

import { generateUpdateManyMethod } from './update-many-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateUpdateManyMethod', () => {
  it('generates the expected method declaration structure', () => {
    const model: Model = {
      name: 'User',
      fields: [],
      pluralName: '',
      primaryKey: null,
    };

    const methodDeclaration = generateUpdateManyMethod(model);

    // Check function name
    expect(methodDeclaration.name).toBe('updateMany');

    // Check parameters
    expect(methodDeclaration.parameters).toHaveLength(2);
    expect(methodDeclaration.parameters?.[0].name).toBe('args');
    expect(methodDeclaration.parameters?.[0].type).toBe(
      `Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>`,
    );
    expect(methodDeclaration.parameters?.[1].name).toBe('prisma');
    expect(methodDeclaration.parameters?.[1].type).toBe(
      `Prisma.UserDelegate<any>`,
    );
    expect(methodDeclaration.parameters?.[1].initializer).toBe(
      `this.prismaClient.user`,
    );

    // Check type parameters
    expect(methodDeclaration.typeParameters).toEqual([
      {
        name: 'T',
        kind: StructureKind.TypeParameter,
        constraint: `Prisma.UserUpdateManyArgs`,
      },
    ]);

    // Check return type
    expect(methodDeclaration.statements).toBe(
      `return prisma.updateMany<T>(args);`,
    );

    // TODO : a check for description ? see with Max
  });
});
