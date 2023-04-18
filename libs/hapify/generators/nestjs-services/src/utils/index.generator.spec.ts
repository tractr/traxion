import { Project } from 'ts-morph';

import {
  generateDirectoryIndexExporter,
  generateFileIndexExporter,
} from './index.generator';

describe('index.generator', () => {
  let project: Project;
  const sourceFilePath = '/test';

  beforeEach(() => {
    project = new Project();
  });

  describe('generateFileIndexExporter', () => {
    it('should add export declarations to index.ts file for all source files in the directory', () => {
      // create source files
      project.createSourceFile(`${sourceFilePath}/file1.ts`, '');
      project.createSourceFile(`${sourceFilePath}/file2.ts`, '');

      // call the function
      generateFileIndexExporter(project, sourceFilePath);

      // assert
      const indexFile = project.getSourceFile(`${sourceFilePath}/index.ts`);
      expect(indexFile?.getExportDeclarations().length).toBe(2);
      expect(
        indexFile?.getExportDeclarations()[0].getModuleSpecifierValue(),
      ).toBe('./file1');
      expect(
        indexFile?.getExportDeclarations()[1].getModuleSpecifierValue(),
      ).toBe('./file2');
    });

    it('should not add an export declaration for the index file itself', () => {
      // create source files
      project.createSourceFile(`${sourceFilePath}/index.ts`, '');
      project.createSourceFile(`${sourceFilePath}/file.ts`, '');

      // call the function
      generateFileIndexExporter(project, sourceFilePath);

      // assert
      const indexFile = project.getSourceFile(`${sourceFilePath}/index.ts`);
      expect(indexFile?.getExportDeclarations().length).toBe(1);
      expect(
        indexFile?.getExportDeclarations()[0].getModuleSpecifierValue(),
      ).toBe('./file');
    });
  });

  describe('generateDirectoryIndexExporter', () => {
    it('generates index.ts file with export declarations for all subdirectories', () => {
      // Create a temporary directory structure
      const dirPath = './test';
      const subDirPaths = ['foo', 'bar', 'baz'];
      const filePaths = ['file1.ts', 'file2.ts'];

      project.createDirectory(dirPath);
      subDirPaths.forEach((subDirPath) =>
        project.createDirectory(`${dirPath}/${subDirPath}`),
      );
      filePaths.forEach((filePath) =>
        project.createSourceFile(`${dirPath}/${filePath}`),
      );

      // Generate index.ts file
      generateDirectoryIndexExporter(project, dirPath);

      // Check if the index.ts file contains export declarations for each subdirectory
      const sourceFile = project.getSourceFile(`${dirPath}/index.ts`);
      expect(sourceFile).toBeTruthy();
      subDirPaths.forEach((subDirPath) => {
        const exportDeclaration = sourceFile?.getExportDeclaration(
          (node) => node.getModuleSpecifierValue() === `./${subDirPath}`,
        );
        expect(exportDeclaration).toBeTruthy();
      });
    });
  });
});
