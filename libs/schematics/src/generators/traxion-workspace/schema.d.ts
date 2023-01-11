import { AvailableTraxionTemplates } from '../../schematics.constants';

export interface TraxionWorkspaceGeneratorSchema {
  useConfigs: boolean;
  useGitaction: boolean;
  useAllLibraries: boolean;
  skipInstall: boolean;
  skipFormat: boolean;
}

interface NormalizedOptions extends TraxionWorkspaceGeneratorSchema {
  useConfigs: boolean;
  useGitaction: boolean;
  useAllLibraries: boolean;
  librariesToInstall: AvailableTraxionTemplates[];

  skipInstall: boolean;
  skipFormat: boolean;

  packageVersion: string;
  npmScope: string;

  appsDir: string;
  libsDir: string;
  // generatedDir: string;
  // adminName: string;
  // apiName: string;
  // pwaName: string;
  // generatedImportPath: string;
  // uuid4: string;
}
