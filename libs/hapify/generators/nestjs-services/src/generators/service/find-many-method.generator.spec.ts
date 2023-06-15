import {
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindManyMethod } from './find-many-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateFindManyMethod', () => {
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
  const generatedMethod = generateFindManyMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(generatedMethod.name).toEqual('findMany');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      generatedMethod.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserFindManyArgs`);
    expect(typeParameters?.[0].kind).toEqual(39); // corresponds to `StructureKind.TypeParameter`
  });

  it('generates a method declaration with the correct parameters', () => {
    const parameters =
      generatedMethod.parameters as ParameterDeclarationStructure[];

    expect(parameters?.[0].name).toEqual('args');
    expect(parameters?.[0].type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserFindManyArgs>`,
    );
    expect(parameters?.[0].kind).toEqual(30); // corresponds to `StructureKind.Parameter`

    expect(parameters?.[1].name).toEqual('prisma');
    expect(parameters?.[1].type).toEqual(
      `Prisma.UserDelegate<GlobalRejectSettings>`,
    );
    expect(parameters?.[1].kind).toEqual(30); // corresponds to `StructureKind.Parameter`
    expect(parameters?.[1].initializer).toEqual(`this.prismaClient.user`);
  });

  it('generates a method declaration with the correct statements', () => {
    const expectedStatements = `const users = await prisma.findMany<T>(args);
    return users;`;

    expect(compressWhitespace(generatedMethod.statements as string)).toEqual(
      compressWhitespace(expectedStatements),
    );
  });

  it('generates a method declaration with the correct documentation', () => {
    const expectedDocs = [
      {
        kind: 24, // corresponds to `StructureKind.JSDoc`
        description: expect.any(String),
      },
    ];

    expect(generatedMethod.docs).toEqual(expectedDocs);
  });
});
