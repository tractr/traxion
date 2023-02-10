import { Project } from "ts-morph";

export const addIndex = (project: Project, indexFile: string) => {
  const indexSourceFile = project.getSourceFile(indexFile) ?? project.createSourceFile(indexFile);
  indexSourceFile.addExportDeclaration({
    // moduleSpecifier: `'${indexFile}'`,
    moduleSpecifier: `./index`,
  });
}