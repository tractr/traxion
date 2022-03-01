export interface PwaAppGeneratorSchema {
  name: string;
  directory?: string;
  apiName: string;
  generatedDir: string;
}

interface NormalizedOptions extends PwaAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  apiName: string;
  appsDir: string;
  npmScope: string;
  generatedImportPath: string;
}
