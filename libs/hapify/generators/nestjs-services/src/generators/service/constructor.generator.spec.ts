import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateConstructor', () => {
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
  it('should generate a constructor declaration', () => {
    const constructorDeclaration: ConstructorDeclarationStructure =
      generateConstructor(model);

    expect(constructorDeclaration.parameters).toHaveLength(2);

    const prismaClientParameter = constructorDeclaration?.parameters?.[0];
    expect(prismaClientParameter?.kind).toBe(StructureKind.Parameter);
    expect(prismaClientParameter?.name).toBe('prismaClient');
    expect(prismaClientParameter?.type).toBe('PrismaService');
    expect(prismaClientParameter?.scope).toBe(Scope.Private);
    expect(prismaClientParameter?.isReadonly).toBe(true);

    const userDefaultParameter = constructorDeclaration?.parameters?.[1];
    expect(userDefaultParameter?.kind).toBe(StructureKind.Parameter);
    expect(userDefaultParameter?.name).toBe('userDefaultService');
    expect(userDefaultParameter?.type).toBe('UserDefaultService');
    expect(userDefaultParameter?.scope).toBe(Scope.Private);
    expect(userDefaultParameter?.isReadonly).toBe(true);
  });
});
