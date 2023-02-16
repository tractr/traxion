import { ImportDeclarationStructure, StructureKind } from "ts-morph"



export const generateImport = (moduleSpecifier:string, imports: string[] ): ImportDeclarationStructure => ({
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier,
    namedImports: imports.map((name) => ({ name })),
  })
