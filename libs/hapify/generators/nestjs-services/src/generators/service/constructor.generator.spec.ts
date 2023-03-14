import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';

import { Model } from '@trxn/hapify-core';

describe('generateConstructor', () => {
  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [],
    primaryKey: null,
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
  });
});
