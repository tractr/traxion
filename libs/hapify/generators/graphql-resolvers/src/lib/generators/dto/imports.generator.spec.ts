import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

import { generateImports } from './imports.generator';
import { GraphqlResolverImportPathConfig } from '../../config.type';

import { Model } from '@trxn/hapify-core';

jest.mock('@trxn/hapify-devkit', () => ({
  resolveDynamicPath: jest.fn((path: string, _rootPath: string) => path),
}));

describe('generateImports', () => {
  const importPaths: GraphqlResolverImportPathConfig = {
    graphqlDtos: './graphql-dtos-path',
    nestjsServices: '',
  };

  const model: Model = {
    name: 'testModel',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };

  it('should generate correct import declarations', () => {
    const expectedResult: ImportDeclarationStructure[] = [
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './graphql-dtos-path',
        namedImports: [
          { name: 'TestModel' },
          { name: 'FindUniqueTestModelArgs' },
          { name: 'FindManyTestModelArgs' },
          { name: 'CreateOneTestModelArgs' },
          { name: 'UpdateOneTestModelArgs' },
          { name: 'DeleteOneTestModelArgs' },
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
