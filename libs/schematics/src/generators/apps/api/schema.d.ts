export interface ApiAppGeneratorSchema {
  name: string;
  skipInstall?: boolean;
}

interface NormalizedOptions extends ApiAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  appsDir: string;
  npmScope: string;
  caslImportPath: string;
  nestjsModelsImportPath: string;
  nestjsModelsCommonImportPath: string;
}
