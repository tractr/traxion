import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model, PrimaryField } from '@trxn/hapify-core';

jest.mock('@trxn/hapify-devkit', () => ({
  resolveDynamicPath: jest.fn((path: string, _rootPath: string) => path),
}));

describe('generateImports', () => {
  const importPaths: GraphqlResolverImportPathConfig = {
    graphqlDtos: './graphql-dtos-path',
    nestjsServices: '',
  };

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

  it('should generate correct import declarations', () => {
    const expectedResult: ImportDeclarationStructure[] = [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './graphql-dtos-path',
        namedImports: [
          { name: 'User' },
          { name: 'FindUniqueUserArgs' },
          { name: 'FindManyUserArgs' },
          { name: 'CreateOneUserArgs' },
          { name: 'UpdateOneUserArgs' },
          { name: 'DeleteOneUserArgs' },
        ],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@trxn/nestjs-graphql',
        namedImports: [{ name: 'FindManyPagination' }],
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@nestjs/graphql',
        namedImports: [{ name: 'Field' }, { name: 'ObjectType' }],
      },
    ];

    const result = generateImports(model, importPaths);
    expect(result).toEqual(expectedResult);
  });
});
