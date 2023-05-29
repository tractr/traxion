import {
  JSDocStructure,
  MethodDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import { indent } from '@trxn/hapify-devkit';

export const generateDefaultInternalsMethod =
  (): MethodDeclarationStructure[] => {
    const docsDefaultInternals: JSDocStructure[] = [
      {
        kind: StructureKind.JSDoc,
        description: indent`
        Return default internal fields
        `,
      },
    ];

    // TODO: add default internal fields management
    // const docsDefaultCreatedAt: JSDocStructure[] = [
    //   {
    //     kind: StructureKind.JSDoc,
    //     description: `
    //     Return default value for internal field 'createdAt'
    //     `,
    //   },
    // ];

    return [
      {
        kind: StructureKind.Method,
        name: 'getDefaultInternals',
        statements: `return {};`,
        // TODO: add default internal fields management
        // statements: `return { createdAt: this.getDefaultCreatedAt(), };`,
        docs: docsDefaultInternals,
      },
      // TODO: add default internal fields management
      // {
      //   kind: StructureKind.Method,
      //   name: 'getDefaultCreatedAt',
      //   statements: `return new Date();`,
      //   docs: docsDefaultCreatedAt,
      // },
    ];
  };
