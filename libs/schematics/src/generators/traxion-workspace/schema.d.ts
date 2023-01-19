import { AvailableTraxionTemplates } from '../../schematics.constants';

export interface TraxionWorkspaceGeneratorSchema {
  createApps: boolean;
  useConfigs: boolean;
  useGitaction: boolean;
  useAllLibraries: boolean;
  skipInstall: boolean;
  skipFormat: boolean;
}

interface NormalizedOptions extends TraxionWorkspaceGeneratorSchema {
  librariesToInstall: AvailableTraxionTemplates[];

  packageVersion: string;
  npmScope: string;

  appsDir: string;
  libsDir: string;

  // adminName: string;
  // apiName: string;
  // pwaName: string;
}
