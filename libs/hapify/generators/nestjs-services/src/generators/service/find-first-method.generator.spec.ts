import { pascal } from 'case';
import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindFirstMethod } from './find-first-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateFindFirstMethod', () => {
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
  const method: MethodDeclarationStructure = generateFindFirstMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toEqual('findFirst');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters: TypeParameterDeclarationStructure[] =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters.length).toEqual(2);
    expect(typeParameters[0].name).toEqual('T');
    expect(typeParameters[0].constraint).toEqual(
      `Prisma.${pascal(model.name)}FindFirstArgs`,
    );
  });

  it('generates a method declaration with the correct parameters', () => {
    const parameters: ParameterDeclarationStructure[] =
      method.parameters as ParameterDeclarationStructure[];

    expect(parameters.length).toEqual(2);

    expect(parameters[0].name).toEqual('args');
    expect(parameters[0].type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>`,
    );

    expect(parameters[1].name).toEqual('prisma');
    expect(parameters[1].type).toEqual(
      `Prisma.UserDelegate<GlobalRejectSettings>`,
    );
    expect(parameters[1].initializer).toEqual(`this.prismaClient.user`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(compressWhitespace(method.statements as string)).toEqual(
      `const user = await prisma.findFirst<T, false>(args); return user;`,
    );
  });

  it('generates a method declaration with the correct documentation', () => {
    const docs = method.docs as { description: string }[];

    expect(docs.length).toEqual(1);
    expect(docs[0].description).toContain(
      `Find the first User that matches the filter.`,
    );
  });
});
