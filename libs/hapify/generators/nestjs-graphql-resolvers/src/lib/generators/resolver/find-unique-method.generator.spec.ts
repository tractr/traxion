import { DecoratorStructure, StructureKind } from 'ts-morph';

import { generateFindUniqueMethod } from './find-unique-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateFindUniqueMethod', () => {
  const id: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };

  const user: Model = {
    name: 'User',
    pluralName: 'users',
    fields: [id],
    primaryKey: {
      name: 'id',
      fields: [id],
    },
    dbName: null,
  };
  const method = generateFindUniqueMethod(user);

  it('should generate the findUnique method with the correct name', () => {
    expect(method.name).toBe('findUniqueUser');
  });

  it('should generate the findUnique method as asynchronous', () => {
    expect(method.isAsync).toBe(true);
  });

  it('should generate the correct kind of method', () => {
    expect(method.kind).toBe(StructureKind.Method);
  });

  it('should generate the correct decorators', () => {
    const expectedDecorators: DecoratorStructure[] = [
      {
        kind: StructureKind.Decorator,
        name: 'Query',
        arguments: ['() => User', '{ nullable: true }'],
      },
    ];

    expect(method.decorators).toEqual(expectedDecorators);
  });

  it('should generate the correct parameters', () => {
    // Test that each key has the correct value
    expect(method.parameters?.[0].name).toBe('info');
    expect(method.parameters?.[0].kind).toBe(StructureKind.Parameter);
    expect(method.parameters?.[0].type).toBe('GraphQLResolveInfo');
    expect(method.parameters?.[0].decorators).toEqual([
      { name: 'Info', arguments: [] },
    ]);

    expect(method.parameters?.[1].name).toBe('{ where }');
    expect(method.parameters?.[1].kind).toBe(StructureKind.Parameter);
    expect(method.parameters?.[1].type).toBe('FindUniqueUserArgs');
    expect(method.parameters?.[1].decorators).toEqual([
      {
        name: 'Args',
        arguments: ['{ nullable: true, defaultValue: {} }'],
      },
    ]);
  });

  it('should generate the correct method statements for the User model', () => {
    const expectedStatements = `
    const select = new PrismaSelect(info).value as Prisma.UserDefaultArgs;
    const user =  await this.userService.findUnique({where, ...select});
    return user;
  `;

    expect(method.statements).toBe(expectedStatements);
  });

  it('should generate the correct method documentation for the User model', () => {
    const expectedDocs = [
      {
        kind: StructureKind.JSDoc,
        description: 'Query for a unique user',
      },
    ];

    expect(method.docs).toEqual(expectedDocs);
  });
});
