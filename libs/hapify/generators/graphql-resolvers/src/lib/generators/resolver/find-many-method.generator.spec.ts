import {
  DecoratorStructure,
  ParameterDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { generateFindManyMethod } from './find-many-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateFindManyMethod', () => {
  const user: Model = {
    name: 'User',
    pluralName: 'Users',
    fields: [],
    primaryKey: null,
  };

  it('should generate the create method with the correct name', () => {
    const method = generateFindManyMethod(user);
    expect(method.name).toEqual('findManyUsers');
  });

  it('should generate the create method as asynchronous', () => {
    const method = generateFindManyMethod(user);
    expect(method.isAsync).toBe(true);
  });

  it('should generate the correct kind of method', () => {
    const method = generateFindManyMethod(user);
    expect(method.kind).toEqual(StructureKind.Method);
  });

  it('should generate the correct decorators', () => {
    const method = generateFindManyMethod(user);
    const decorators: DecoratorStructure[] = [
      {
        kind: StructureKind.Decorator,
        name: 'Query',
        arguments: [`() => FindManyUserOutput`],
      },
    ];
    expect(method.decorators).toEqual(decorators);
  });

  it('should generate the correct parameters', () => {
    const method = generateFindManyMethod(user);
    const expectedParams: ParameterDeclarationStructure[] = [
      {
        name: 'info',
        kind: StructureKind.Parameter,
        type: 'GraphQLResolveInfo',
        decorators: [{ name: 'Info', arguments: [] }],
      },
      {
        kind: StructureKind.Parameter,
        name: `
        {
          where,
          cursor,
          distinct,
          orderBy = [{ id: 'asc' }],
          skip = 0,
          take = 100,
        }
      `,
        type: 'FindManyUserArgs',
        decorators: [{ name: 'Args', arguments: ['{ nullable: true }'] }],
      },
    ];

    expect(method.parameters).toEqual(expectedParams);

    // individual parameter expectations
    expect(method.parameters?.[0].name).toEqual('info');
    expect(method.parameters?.[0].type).toEqual('GraphQLResolveInfo');
    expect(method.parameters?.[0].decorators).toEqual([
      { name: 'Info', arguments: [] },
    ]);

    expect(method.parameters?.[1].name).toEqual(`
        {
          where,
          cursor,
          distinct,
          orderBy = [{ id: 'asc' }],
          skip = 0,
          take = 100,
        }
      `);
    expect(method.parameters?.[1].type).toEqual('FindManyUserArgs');
    expect(method.parameters?.[1].decorators).toEqual([
      { name: 'Args', arguments: ['{ nullable: true }'] },
    ]);
  });

  it('should generate the correct method statements for the User model', () => {
    const method = generateFindManyMethod(user);
    const expectedStatements = `
    const select = new PrismaSelect(info).valueOf('users', 'User') as Prisma.UserArgs;

    const users = await this.userService.findMany({
      ...select,
      where,
      cursor,
      distinct,
      orderBy,
      skip,
      take: take + 1,
    });

    const count = await this.userService.count({
      where,
    });

    return {
      users: users.slice(0, take),
      count,
      hasNextPage: typeof users[take] !== 'undefined',
    };
  `;
    expect(method.statements).toEqual(expectedStatements);
  });
});
