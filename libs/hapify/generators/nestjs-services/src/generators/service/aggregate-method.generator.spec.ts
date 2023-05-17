import { StructureKind, TypeParameterDeclarationStructure } from 'ts-morph';

import { generateAggregateMethod } from './aggregate-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateAggregateMethod', () => {
  const model: Model = {
    name: 'user',
    fields: [],
    pluralName: '',
    primaryKey: null,
  };
  const method = generateAggregateMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toBe('aggregate');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserAggregateArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = method.parameters?.[0];
    const prismaParameters = method.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserAggregateArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<undefined>`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(method.statements).toBe('return prisma.aggregate<T>(args);');
  });

  it('generates a method declaration with the correct documentation', () => {
    expect(method.docs).toEqual([
      {
        kind: 24,
        description: `
        Allows you to perform aggregations operations on a User.
        Note, that providing 'undefined' is treated as the value not being there.
        Read more here: https://pris.ly/d/null-undefined
        @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
        @example
        // Ordered by age ascending
        // Where email contains prisma.io
        // Limited to the 10 users
        const aggregations = await this.userService.aggregate({
          avg: {
            age: true,
          },
          where: {
            email: {
              contains: "prisma.io",
            },
          },
          orderBy: {
            age: "asc",
          },
          take: 10,
        })`,
      },
    ]);
  });
});
