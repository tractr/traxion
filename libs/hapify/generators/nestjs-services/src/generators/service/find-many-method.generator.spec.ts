import {
  ParameterDeclarationStructure,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindManyMethod } from './find-many-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateFindManyMethod', () => {
  const model: Model = {
    name: 'user',
    fields: [],
    pluralName: '',
    primaryKey: null,
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
    expect(parameters?.[1].type).toEqual(`Prisma.UserDelegate<any>`);
    expect(parameters?.[1].kind).toEqual(30); // corresponds to `StructureKind.Parameter`
    expect(parameters?.[1].initializer).toEqual(`this.prismaClient.user`);
  });

  it('generates a method declaration with the correct statements', () => {
    const expectedStatements = `return prisma.findMany<T>(args);`;
    expect(generatedMethod.statements).toEqual(expectedStatements);
  });

  it('generates a method declaration with the correct documentation', () => {
    const expectedDocs = [
      {
        kind: 24, // corresponds to `StructureKind.JSDoc`
        description: `
       Find zero or more Users that matches the filter.
       Note, that providing 'undefined' is treated as the value not being there.
       Read more here: https://pris.ly/d/null-undefined
       @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
       @example
       // Get all Users
       const users = await this.userService.findMany()

       // Get first 10 Users
       const Users = await this.UserService.findMany({ take: 10 })

       // Only select the 'id'
       const userWithIdOnly = await this.UserService.findMany({ select: { id: true } })

    `,
      },
    ];

    expect(generatedMethod.docs).toEqual(expectedDocs);
  });
});
