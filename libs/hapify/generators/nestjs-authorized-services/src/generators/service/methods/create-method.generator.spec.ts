import {
  MethodDeclarationStructure,
  StructureKind,
  TypeParameterDeclarationStructure,
} from 'ts-morph';

import { generateCreateMethod } from './create-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateCreateMethod', () => {
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
    generateCreateMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(methodDeclaration.name).toBe('create');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      methodDeclaration.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserCreateArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = methodDeclaration.parameters?.[0];
    const abilitiesParameters = methodDeclaration.parameters?.[1];
    const prismaParameters = methodDeclaration.parameters?.[2];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserCreateArgs>`,
    );

    expect(prismaParameters?.name).toEqual('prisma');
    expect(prismaParameters?.kind).toEqual(30);
    expect(prismaParameters?.kind).toEqual(StructureKind.Parameter);
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate`);

    expect(abilitiesParameters?.name).toEqual('abilities');
    expect(abilitiesParameters?.kind).toEqual(30);
    expect(abilitiesParameters?.kind).toEqual(StructureKind.Parameter);
    expect(compressWhitespace(abilitiesParameters?.type as string)).toEqual(
      `PureAbility< any, PrismaQuery<Record<string, any> & ForcedSubject<string>> >`,
    );
  });

  it('generates a method declaration with the correct statements', () => {
    const expectedStatements = `const create = async(client: Prisma.UserDelegate) => { const user = await this.userService.create<T>(args, client); if (abilities?.cannot(Action.Create, subject('User', user))) throw new ForbiddenException('cannot create User'); return user; } if (prisma) return create(prisma); return this.prisma.$transaction((client) => create(client.user));`;

    expect(
      compressWhitespace((methodDeclaration.statements as string[]).join('\n')),
    ).toEqual(expectedStatements);
  });
});
