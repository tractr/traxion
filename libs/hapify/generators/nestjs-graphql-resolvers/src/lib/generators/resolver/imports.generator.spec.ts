import { StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateImports', () => {
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

  const importPaths: GraphqlResolverImportPathConfig = {
    graphqlDtos: '@src/graphql/dtos',
    nestjsServices: '@src/nestjs/services',
  };

  const imports = generateImports(model, importPaths);
  it('returns an array of import declaration structures', () => {
    expect(imports).toBeInstanceOf(Array);

    // check first import declaration
    expect(imports[0].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[0].moduleSpecifier).toBe('@src/graphql/dtos');
    expect(imports[0].namedImports).toEqual([
      { name: 'User' },
      { name: 'FindUniqueUserArgs' },
      { name: 'FindManyUserArgs' },
      { name: 'CreateOneUserArgs' },
      { name: 'UpdateOneUserArgs' },
      { name: 'DeleteOneUserArgs' },
    ]);
    expect(imports[1].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[1].moduleSpecifier).toBe('@src/nestjs/services');
    expect(imports[1].namedImports).toEqual([{ name: 'UserService' }]);
    expect(imports[2].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[2].moduleSpecifier).toBe('@nestjs/common');
    expect(imports[2].namedImports).toEqual([{ name: 'Inject' }]);
    expect(imports[3].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[3].moduleSpecifier).toBe('@nestjs/graphql');
    expect(imports[3].namedImports).toEqual([
      { name: 'Args' },
      { name: 'Info' },
      { name: 'Mutation' },
      { name: 'Parent' },
      { name: 'Query' },
      { name: 'ResolveField' },
      { name: 'Resolver' },
    ]);
    expect(imports[4].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[4].moduleSpecifier).toBe('@paljs/plugins');
    expect(imports[4].namedImports).toEqual([{ name: 'PrismaSelect' }]);
    expect(imports[5].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[5].moduleSpecifier).toBe('@prisma/client');
    expect(imports[5].namedImports).toEqual([{ name: 'Prisma' }]);
    expect(imports[6].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[6].moduleSpecifier).toBe('@trxn/nestjs-graphql');
    expect(imports[6].namedImports).toEqual([
      { name: 'getPathFromGraphQLResolveInfo' },
    ]);
    expect(imports[7].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[7].moduleSpecifier).toBe('graphql');
    expect(imports[7].namedImports).toEqual([{ name: 'GraphQLResolveInfo' }]);
    expect(imports[8].kind).toBe(StructureKind.ImportDeclaration);
    expect(imports[8].moduleSpecifier).toBe('../dtos');
    expect(imports[8].namedImports).toEqual([{ name: 'FindManyUserOutput' }]);
  });
});
