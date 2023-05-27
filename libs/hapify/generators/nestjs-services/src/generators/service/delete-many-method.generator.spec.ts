import { StructureKind, TypeParameterDeclarationStructure } from 'ts-morph';

import { generateDeleteManyMethod } from './delete-many-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateDeleteMethod', () => {
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
  const method = generateDeleteManyMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toEqual('deleteMany');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserDeleteArgs`); // FIXME : check type ?
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = method.parameters?.[0];
    const prismaParameters = method.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<undefined>`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(method.statements).toEqual('return prisma.deleteMany<T>(args);');
  });

  it('generates a method declaration with the correct documentation', () => {
    expect(method.docs).toEqual([
      {
        kind: 24,
        description: expect.any(String),
      },
    ]);
  });
});
