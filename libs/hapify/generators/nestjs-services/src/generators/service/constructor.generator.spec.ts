import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import { generateConstructor } from './constructor.generator';

describe('generateConstructor', () => {
  it('should generate a constructor declaration', () => {
    const constructorDeclaration: ConstructorDeclarationStructure =
      generateConstructor();

    expect(constructorDeclaration.parameters).toHaveLength(1);

    const prismaClientParameter = constructorDeclaration?.parameters?.[0];
    expect(prismaClientParameter?.kind).toBe(StructureKind.Parameter);
    expect(prismaClientParameter?.name).toBe('prismaClient');
    expect(prismaClientParameter?.type).toBe('PrismaService');
    expect(prismaClientParameter?.scope).toBe(Scope.Private);
    expect(prismaClientParameter?.isReadonly).toBe(true);
  });
});
