import { StructureKind } from 'ts-morph';

import { generateUpdateMethod } from './update-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateUpdateMethod', () => {
  it('generates a valid update method for a model', () => {
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
    expect(compressWhitespace(methodDeclaration.statements as string)).toBe(
      `const user = await prisma.update<T>(args); return user;`,
    );

    // TODO : a check for description ? see with Max
  });
});
