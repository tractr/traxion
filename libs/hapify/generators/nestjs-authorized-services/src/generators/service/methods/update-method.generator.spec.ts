import { StructureKind } from 'ts-morph';

import { generateUpdateMethod } from './update-method.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';
import { compressWhitespace } from '@trxn/nestjs-core';

describe('generateUpdateMethod', () => {
  it('generates a valid update method for a model', () => {
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

    const methodDeclaration = generateUpdateMethod(model);

    // Check function name
    expect(methodDeclaration.name).toBe('update');

    // Check parameters
    expect(methodDeclaration.parameters).toHaveLength(3);
    expect(methodDeclaration.parameters?.[0].name).toBe('args');
    expect(methodDeclaration.parameters?.[0].type).toBe(
      `Prisma.SelectSubset<T, Prisma.UserUpdateArgs>`,
    );

    // Check type parameters
    expect(methodDeclaration.typeParameters).toEqual([
      {
        name: 'T',
        kind: StructureKind.TypeParameter,
        constraint: `Prisma.UserUpdateArgs`,
      },
    ]);

    // Check return type
    expect(
      compressWhitespace((methodDeclaration.statements as string[]).join('\n')),
    ).toBe(
      `const update = async(client: Prisma.UserDelegate) => { const user = await this.userService.update<T>(args, client); if (abilities?.cannot(Action.Update, subject('User', user))) throw new ForbiddenException('cannot update User'); return user; } if (prisma) return update(prisma); return this.prisma.$transaction((client) => update(client.user));`,
    );

    // TODO : a check for description ? see with Max
  });
});
