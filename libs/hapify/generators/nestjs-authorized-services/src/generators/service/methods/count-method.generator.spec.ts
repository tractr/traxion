import { StructureKind, TypeParameterDeclarationStructure } from 'ts-morph';

import { generateCountMethod } from './count-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateCountMethod', () => {
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

  const methodDeclaration = generateCountMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(methodDeclaration.name).toEqual('count');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      methodDeclaration.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserCountArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = methodDeclaration.parameters?.[0];
    const abilitiesParameters = methodDeclaration.parameters?.[1];
    const prismaParameters = methodDeclaration.parameters?.[2];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserCountArgs>`,
    );

    expect(abilitiesParameters?.name).toEqual('abilities');
    expect(abilitiesParameters?.kind).toEqual(30);
    expect(abilitiesParameters?.kind).toEqual(StructureKind.Parameter);
    expect(compressWhitespace(abilitiesParameters?.type as string)).toEqual(
      `PureAbility< any, PrismaQuery<Record<string, any> & ForcedSubject<string>> >`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(
      `Prisma.UserDelegate<GlobalRejectSettings>`,
    );
  });

  it('generates a method declaration with the correct statements', () => {
    expect(
      compressWhitespace((methodDeclaration.statements as string[]).join('\n')),
    ).toEqual(
      `const where = { AND: [abilities ? accessibleBy(abilities).User : {}, args?.where ?? {}], }; return this.userService.count<T, GlobalRejectSettings>({ ...args, where });`,
    );
  });
});
