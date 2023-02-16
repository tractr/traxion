import { ImportDeclarationStructure, StructureKind } from "ts-morph"


/**
 * take a module specifier (path) and a list of imports (functions, variables, ... that you want to import) 
 * and generate an import declaration
 * 
 * @param moduleSpecifier 
 * @param imports list of imports
 * @returns ImportDeclarationStructure
 */
export const generateImport = (moduleSpecifier:string, imports: string[] ): ImportDeclarationStructure => ({
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier,
    namedImports: imports.map((name) => ({ name })),
  })
