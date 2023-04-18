import {
  MethodDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateCreateManyMethod } from './create-many-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateCreateMethod', () => {
  const model: Model = {
    name: 'user',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };
  const methodDeclaration: MethodDeclarationStructure =
    generateCreateManyMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(methodDeclaration.name).toBe('createMany');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      methodDeclaration.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserCreateManyArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const method: MethodDeclarationStructure = generateCreateManyMethod(model);

    const argsParameters = method.parameters?.[0];
    const prismaParameters = method.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<any>`);
  });

  it('generates a method declaration with the correct statements', () => {
    const expectedStatements = 'return prisma.createMany<T>(args);';

    expect(methodDeclaration.statements).toEqual(expectedStatements);
  });
});
