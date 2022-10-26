export interface PwaAppGeneratorSchema {
  name: string;
  apiName: string;
  skipInstall?: boolean;
  angularRextDirectory?: string;
}

interface NormalizedOptions extends PwaAppGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  apiName: string;
  appsDir: string;
  npmScope: string;
  angularRextImportPath: string;
  caslImportPath: string;
  modelsImportPath: string;
}
