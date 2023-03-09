import {
  ConstructorDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

export function generateConstructor(): ConstructorDeclarationStructure {
  return {
    kind: StructureKind.Constructor,
    parameters: [
      {
        kind: StructureKind.Parameter,
        name: `prismaClient`,
        type: `PrismaClient`,
        scope: Scope.Private,
        isReadonly: true,
      },
    ],
  };
}
