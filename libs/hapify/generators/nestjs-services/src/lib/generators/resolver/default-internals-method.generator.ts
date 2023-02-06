import {
  JSDocStructure,
  MethodDeclarationStructure,
  StructureKind,
} from 'ts-morph';


export const generateDefaultInternalsMethod = (): MethodDeclarationStructure[] => {
  
    const docsDefaultInternals: JSDocStructure[] = [
      {
        kind: StructureKind.JSDoc,
        description: `
        Return default internal fields
        `,
      },
    ];
    
    const docsDefaultCreatedAt: JSDocStructure[] = [
      {
        kind: StructureKind.JSDoc,
        description: `
        Return default value for internal field 'createdAt'
        `,
      },
    ];


  return  [
    {
      kind: StructureKind.Method,
      name: 'getDefaultInternals',
      statements: `return {
        createdAt: this.getDefaultCreatedAt(),
      };`,
     docs: docsDefaultInternals
    },
    {
      kind: StructureKind.Method,
      name: 'getDefaultCreatedAt',
      statements: `return new Date();`,
     docs: docsDefaultCreatedAt
    }
]
}
