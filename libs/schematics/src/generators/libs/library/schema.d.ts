import {
  LibraryType,
  TraxionListPackages,
} from '../../../schematics.constants';

export interface HapifyLibraryGeneratorOptionsWithExtra
  extends HapifyLibraryGeneratorOptions,
    Record<string, unknown> {}

export interface HapifyLibraryGeneratorOptions {
  name?: string;
  directory?: string;
  type?: LibraryType;
  hapifyTemplate: TraxionListPackages;
  hapifyModelsJson: string;
  hapifyUseImportReplacements: boolean;
  useSecondaryEndpoint: boolean;
  addSecondaryEndpoint: string[];
  skipInstall?: boolean;
  standalone: boolean;
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
  standalone: boolean;
  extra: Record<string, unknown>;
}
