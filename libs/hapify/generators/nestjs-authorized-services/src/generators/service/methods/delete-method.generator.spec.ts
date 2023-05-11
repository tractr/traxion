import { StructureKind, TypeParameterDeclarationStructure } from 'ts-morph';

import { generateDeleteMethod } from './delete-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateDeleteMethod', () => {
  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };
  const method = generateDeleteMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toEqual('delete');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserDeleteArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = method.parameters?.[0];
    const prismaParameters = method.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserDeleteArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<undefined>`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(method.statements).toEqual('return prisma.delete<T>(args);');
  });

  it('generates a method declaration with the correct documentation', () => {
    expect(method.docs).toEqual([
      {
        kind: 24,
        description: `
    Delete a User.
    @param {UserDeleteArgs} args - Arguments to delete a User
    @example
    // Delete one User
    const user = await this.userService.delete({
      where: {
        // ... filter to delete one User
      }
    })
    `,
      },
    ]);
  });
});
