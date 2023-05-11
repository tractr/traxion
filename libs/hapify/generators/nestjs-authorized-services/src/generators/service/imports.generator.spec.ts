import { generateImports } from './imports.generator';

import { Model } from '@trxn/hapify-core';

describe('generateImports', () => {
  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };
  it('should return an array of import declarations', () => {
    const imports = generateImports(model);

    expect(Array.isArray(imports)).toBe(true);

    const commonImport = imports[0];
    const prismaImport = imports[1];
    const prismaSelectImport = imports[2];

    expect(commonImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(commonImport.moduleSpecifier).toBe('@nestjs/common');
    expect(commonImport.namedImports).toEqual([
      { name: 'Injectable' },
      { name: `Inject` },
    ]);

    expect(prismaImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(prismaImport.moduleSpecifier).toBe('@prisma/client');
    expect(prismaImport.namedImports).toEqual([{ name: `Prisma` }]);

    expect(prismaSelectImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(prismaSelectImport.moduleSpecifier).toBe('@trxn/nestjs-database');
    expect(prismaSelectImport.namedImports).toEqual([
      { name: 'PrismaService' },
    ]);
  });
});
