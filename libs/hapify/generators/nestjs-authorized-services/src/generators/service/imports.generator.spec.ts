import { generateImports } from './imports.generator';

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
  it('should return an array of import declarations', () => {
    const imports = generateImports(model, {
      nestjsServices: './nestjs-services',
    });

    expect(Array.isArray(imports)).toBe(true);

    const commonImport = imports[0];
    const prismaImport = imports[1];
    const caslImport = imports[2];
    const otherSelectImport = imports[3];
    const prismaSelectImport = imports[4];

    expect(commonImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(commonImport.moduleSpecifier).toBe('@nestjs/common');
    expect(commonImport.namedImports).toEqual([
      { name: 'Injectable' },
      { name: `Inject` },
      { name: `ForbiddenException` },
    ]);

    expect(prismaImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(prismaImport.moduleSpecifier).toBe('@prisma/client');
    expect(prismaImport.namedImports).toEqual([{ name: `Prisma` }]);

    expect(caslImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(caslImport.moduleSpecifier).toBe('@casl/prisma');
    expect(caslImport.namedImports).toEqual([
      { name: 'accessibleBy' },
      { name: 'PrismaQuery' },
    ]);

    expect(otherSelectImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(otherSelectImport.moduleSpecifier).toBe('@casl/ability');
    expect(otherSelectImport.namedImports).toEqual([
      { name: 'subject' },
      { name: 'PureAbility' },
      { name: 'ForcedSubject' },
    ]);

    expect(prismaSelectImport.kind).toBe(16); // StructureKind.ImportDeclaration is equal to 16
    expect(prismaSelectImport.moduleSpecifier).toBe('@trxn/nestjs-database');
    expect(prismaSelectImport.namedImports).toEqual([
      { name: 'PrismaService' },
    ]);
  });
});
