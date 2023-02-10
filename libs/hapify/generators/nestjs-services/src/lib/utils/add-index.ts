import { Project } from "ts-morph";

/**
 * 
 * check if the source file exists, if not create it
 * 
 * @param project 
 * @param indexFile 
 * @param sourceFilePath 
 */
export const addIndex = (project: Project, indexFile: string, sourceFilePath: string) => {

  const indexSourceFile = project.getSourceFile(sourceFilePath) ?? project.createSourceFile(sourceFilePath);
  
  indexSourceFile.addExportDeclaration({
    moduleSpecifier: `${indexFile}`,
  });
}