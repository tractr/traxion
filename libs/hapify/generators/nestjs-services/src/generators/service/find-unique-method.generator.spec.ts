import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindUniqueMethod } from './find-unique-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateFindUniqueMethod', () => {
  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };

  it('generates a method declaration with the correct name', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateFindUniqueMethod(model);

    expect(methodDeclaration.name).toBe('findUnique');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateFindUniqueMethod(model);

    const expectedTypeParameters: OptionalKind<TypeParameterDeclarationStructure>[] =
      [
        {
          name: 'T',
          kind: StructureKind.TypeParameter,
          constraint: `Prisma.UserFindUniqueArgs`,
        },
      ];

    expect(methodDeclaration.typeParameters).toEqual(expectedTypeParameters);
  });

  it('generates a method declaration with the correct parameters', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateFindUniqueMethod(model);

    const argsParameters = methodDeclaration.parameters?.[0];
    const prismaParameters = methodDeclaration.parameters?.[1];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate<any>`);
  });

  it('generates a method declaration with the correct statements', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateFindUniqueMethod(model);

    expect(methodDeclaration.statements).toBe(
      'return prisma.findUnique<T>(args);',
    );
  });

  it('generates a method declaration with the correct documentation', () => {
    const methodDeclaration: MethodDeclarationStructure =
      generateFindUniqueMethod(model);

    const expectedDocs: JSDocStructure[] = [
      {
        kind: StructureKind.JSDoc,
        description: `
    Find zero or one User that matches the filter.
    @param {UserFindUniqueArgs} args - Arguments to find a User
    @example
    // Get one User
    const user = await this.userService.findUnique({
      where: {
        // ... provide filter here
      }
    })
    `,
      },
    ];

    expect(methodDeclaration.docs).toEqual(expectedDocs);
  });
});
