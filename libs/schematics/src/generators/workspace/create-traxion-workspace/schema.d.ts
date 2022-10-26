export interface TraxionWorkspaceGeneratorSchema {
  name: string;
  tags?: string;
  skipInstall?: boolean;
}

interface NormalizedOptions extends TraxionWorkspaceGeneratorSchema {
  packageVersion: string;
  npmScope: string;
  appsDir: string;
  libsDir: string;
  adminName: string;
  apiName: string;
  pwaName: string;
  uuid4: string;
  workspaceName: string;
  parsedTags: string[];
}
