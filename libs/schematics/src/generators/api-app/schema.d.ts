export interface ApiAppGeneratorSchema {
  name: string;
  directory?: string;
  generatedDir: string;
  skipInstall?: boolean;
}

interface NormalizedOptions extends ApiAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  appsDir: string;
  npmScope: string;
  generatedImportPath: string;
}
