export interface TraxionWorkspaceGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
}

interface NormalizedOptions extends TraxionWorkspaceGeneratorSchema {
  packageVersion: string;
  npmScope: string;
  appsDir: string;
  libsDir: string;
  generatedDir: string;
  generatedImportPath: string;
  adminName: string;
  apiName: string;
  pwaName: string;
  uuid4: string;
  workspaceName: string;
  parsedTags: string[];
}
