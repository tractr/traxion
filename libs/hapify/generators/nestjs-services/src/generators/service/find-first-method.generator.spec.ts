import { pascal } from 'case';
import {
  MethodDeclarationStructure,
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindFirstMethod } from './find-first-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateFindFirstMethod', () => {
  const model: Model = {
    name: 'user',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };
  const method: MethodDeclarationStructure = generateFindFirstMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toEqual('findFirst');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters: TypeParameterDeclarationStructure[] =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters.length).toEqual(1);
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
    expect(parameters[1].type).toEqual(`Prisma.UserDelegate<any>`);
    expect(parameters[1].initializer).toEqual(`this.prismaClient.user`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(method.statements).toEqual(`return prisma.findFirst<T>(args);`);
  });

  it('generates a method declaration with the correct documentation', () => {
    const docs = method.docs as { description: string }[];

    expect(docs.length).toEqual(1);
    expect(docs[0].description).toContain(
      `Find the first User that matches the filter.`,
    );
  });
});
