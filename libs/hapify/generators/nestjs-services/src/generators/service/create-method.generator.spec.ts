import {
  MethodDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateCreateMethod } from './create-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateCreateMethod', () => {
  const model: Model = {
    name: 'user',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };

  it('generates a method declaration with the correct name', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateCreateMethod(model);
    expect(methodDeclaration.name).toBe('create');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateCreateMethod(model);

    const typeParameters =
      methodDeclaration.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserCreateArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const method: MethodDeclarationStructure = generateCreateMethod(model);

    const argsParameters = method.parameters?.[0];
    const prismaParameters = method.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserCreateArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<any>`);
  });

  it('generates a method declaration with the correct statements', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateCreateMethod(model);

    const expectedStatements = 'return prisma.create<T>(args);';

    expect(methodDeclaration.statements).toEqual(expectedStatements);
  });

  it('generates a method declaration with the correct documentation', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateCreateMethod(model);

    const expectedDocs = [
      {
        kind: 24,
        description: `
      Create a User.
      @param {UserCreateArgs} args - Arguments to create a User.
      @example
      // Create one User
      const User = await this.userService.create({
        data: {
          // ... data to create a User
        }
      })
    
    `,
      },
    ];

    expect(methodDeclaration.docs).toEqual(expectedDocs);
  });
});
