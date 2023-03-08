import { Project } from 'ts-morph';

/**
 *
 * Generate or Update an index.ts file that will export all the files of the current folder
 *
 * @param project
 * @param indexFile
 * @param sourceFilePath
 */
export const generateFileIndexExporter = (
  project: Project,
  sourceFilePath: string,
) => {
  const sourceDir = project.getDirectoryOrThrow(sourceFilePath);
  const sourceFile =
    project.getSourceFile(`${sourceFilePath}/index.ts`) ??
    project.createSourceFile(`${sourceFilePath}/index.ts`, undefined, {
      overwrite: true,
    });
  sourceDir.getSourceFiles().forEach((file) => {
    const fileName = file.getBaseName().replace(/\.ts$/, '');
    if (fileName === 'index') return;
    sourceFile.addExportDeclaration({
      moduleSpecifier: `./${fileName}`,
    });
  });
};

/**
 *
 * Generate or Update an index.ts file that will export all the directory of the current folder
 *
 * @param project
 * @param sourcePath
 */
export const generateDirectoryIndexExporter = (
  project: Project,
  sourcePath: string,
) => {
  const index = `${sourcePath}/index.ts`;
  const sourceDir = project.getDirectoryOrThrow(sourcePath);
  const sourceFile =
    project.getSourceFile(index) ??
    project.createSourceFile(index, undefined, { overwrite: true });

  const subDirs = sourceDir.getDirectories();
  const baseNames = subDirs.map((directory) => directory.getBaseName());

  baseNames.forEach((baseName) => {
    sourceFile.addExportDeclaration({
      moduleSpecifier: `./${baseName}`,
    });
  });
};
