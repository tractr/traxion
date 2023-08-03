import { StructureKind } from 'ts-morph';

import { generateUpsertMethod } from './upsert-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateUpsertMethod', () => {
  it('generates a method declaration for upserting a model', () => {
    const id: PrimaryField = {
      name: 'id',
      type: 'primary',
      pluralName: 'ids',
      scalar: 'string',
      relations: [],
    };

    const model: Model = {
      name: 'User',
      pluralName: '',
      fields: [id],
      primaryKey: {
        name: 'id',
        fields: [id],
      },
      dbName: null,
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
    expect(prismaParameter?.type).toBe(`Prisma.UserDelegate`);
    expect(prismaParameter?.initializer).toBe(`this.prismaClient.user`);

    expect(compressWhitespace(methodDeclaration.statements as string)).toBe(
      'const user = await prisma.upsert<T>(args); return user;',
    );
  });
});
