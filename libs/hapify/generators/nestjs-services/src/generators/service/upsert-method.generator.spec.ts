import { StructureKind } from 'ts-morph';

import { generateUpsertMethod } from './upsert-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateUpsertMethod', () => {
  it('generates a method declaration for upserting a model', () => {
    // Arrange
    const model: Model = {
      name: 'user',
      pluralName: '',
      fields: [],
      primaryKey: null,
    };

    // Check function name
    const methodDeclaration = generateUpsertMethod(model);

    // Assert
    expect(methodDeclaration.name).toBe('upsert');
    expect(methodDeclaration.kind).toBe(StructureKind.Method);
    expect(methodDeclaration.parameters).toHaveLength(2);

    const argsParameter = methodDeclaration.parameters?.[0];
    expect(argsParameter?.name).toBe('args');
    expect(argsParameter?.type).toBe(
      `Prisma.SelectSubset<T, Prisma.UserUpsertArgs>`,
    );

    const prismaParameter = methodDeclaration.parameters?.[1];
    expect(prismaParameter?.name).toBe('prisma');
    expect(prismaParameter?.type).toBe(`Prisma.UserDelegate<undefined>`);
    expect(prismaParameter?.initializer).toBe(`this.prismaClient.user`);

    expect(methodDeclaration.statements).toBe('return prisma.upsert<T>(args);');
  });
});
