import {
  JSDocStructure,
  MethodDeclarationStructure,
  OptionalKind,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateFindUniqueMethod } from './find-unique-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateFindUniqueMethod', () => {
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

  const methodDeclaration: MethodDeclarationStructure =
    generateFindUniqueMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(methodDeclaration.name).toBe('findUnique');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const expectedTypeParameters: OptionalKind<TypeParameterDeclarationStructure>[] =
      [
        {
          name: 'T',
          kind: StructureKind.TypeParameter,
          constraint: `Prisma.UserFindUniqueArgs`,
        },
        {
          name: 'GlobalRejectSettings',
          kind: StructureKind.TypeParameter,
          constraint: `Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined`,
        },
      ];

    expect(methodDeclaration.typeParameters).toEqual(expectedTypeParameters);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = methodDeclaration.parameters?.[0];
    const abilitiesParameters = methodDeclaration.parameters?.[1];
    const prismaParameters = methodDeclaration.parameters?.[2];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(prismaParameters?.type).toEqual(
      `Prisma.UserDelegate<GlobalRejectSettings>`,
    );

    expect(abilitiesParameters?.name).toEqual('abilities');
    expect(abilitiesParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(compressWhitespace(abilitiesParameters?.type as string)).toEqual(
      `PureAbility< any, PrismaQuery<Record<string, any> & ForcedSubject<string>> >`,
    );
  });

  it('generates a method declaration with the correct statements', () => {
    expect(
      compressWhitespace((methodDeclaration.statements as string[]).join('\n')),
    ).toBe(
      `const user = await this.userService.findUnique<T, GlobalRejectSettings>(args, prisma); if (user && abilities?.cannot(Action.Read, subject('User', user))) throw new ForbiddenException('cannot read this user'); return user`,
    );
  });
});
