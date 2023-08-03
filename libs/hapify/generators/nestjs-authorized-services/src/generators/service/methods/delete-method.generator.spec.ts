import { StructureKind, TypeParameterDeclarationStructure } from 'ts-morph';

import { generateDeleteMethod } from './delete-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateDeleteMethod', () => {
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
  const method = generateDeleteMethod(model);

  it('generates a method declaration with the correct name', () => {
    expect(method.name).toEqual('delete');
  });

  it('generates a method declaration with the correct type parameters', () => {
    const typeParameters =
      method.typeParameters as TypeParameterDeclarationStructure[];

    expect(typeParameters?.[0].name).toEqual('T');
    expect(typeParameters?.[0].kind).toEqual(StructureKind.TypeParameter);
    expect(typeParameters?.[0].constraint).toEqual(`Prisma.UserDeleteArgs`);
  });

  it('generates a method declaration with the correct parameters', () => {
    const argsParameters = method.parameters?.[0];
    const abilitiesParameters = method.parameters?.[1];
    const prismaParameters = method.parameters?.[2];

    expect(argsParameters?.name).toEqual('args');
    expect(argsParameters?.kind).toEqual(30); // StructureKind.Parameter is equal to 30
    expect(argsParameters?.type).toEqual(
      `Prisma.SelectSubset<T, Prisma.UserDeleteArgs>`,
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
    expect(prismaParameters?.type).toEqual(`Prisma.UserDelegate`);
  });

  it('generates a method declaration with the correct statements', () => {
    expect(
      compressWhitespace((method.statements as string[]).join('\n')),
    ).toEqual(
      `const deleteCb = async(client: Prisma.UserDelegate) => { const user = await this.userService.delete<T>(args, client); if (abilities?.cannot(Action.Delete, subject('User', user))) throw new ForbiddenException('cannot delete User'); return user; } if (prisma) return deleteCb(prisma); return this.prisma.$transaction((client) => deleteCb(client.user));`,
    );
  });
});
