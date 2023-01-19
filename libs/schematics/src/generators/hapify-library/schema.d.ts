import { TargetConfiguration } from '@nrwl/devkit';

import { AvailableTraxionTemplates } from '../../schematics.constants';

export interface HapifyLibraryGeneratorOptionsWithExtra
  extends HapifyLibraryGeneratorOptions,
    Record<string, unknown> {}

export interface HapifyLibraryGeneratorOptions {
  name?: string;
  directory?: string;
  type?: LibraryType;
  hapifyTemplate: AvailableTraxionTemplates;
  hapifyModelsJson: string;
  hapifyUseImportReplacements: boolean;
  useSecondaryEndpoint: boolean;
  addSecondaryEndpoint: string[];
  skipInstall?: boolean;
}

export interface NormalizedOptions extends HapifyLibraryGeneratorOptions {
  name: string;
  npmScope: string;
  libsDir: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
  importPath: string;
  importPrefixPath: string;
  hapifyModelsJsonRelativePath: string;
  template: string;
  hapifyImportReplacements: Record<string, string>;
  secondaryEntrypoints: string[];
  targets: Record<string, Partial<TargetConfiguration> | null>;
  extra: Record<string, unknown>;
}
