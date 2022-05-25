import { TargetConfiguration } from '@nrwl/devkit';

export type AvailableTractrTemplates =
  | 'angular-rext-client'
  | 'casl'
  | 'dbml'
  | 'models'
  | 'nestjs-models'
  | 'nestjs-graphql'
  | 'nestjs-models-common'
  | 'nestjs-models-rest'
  | 'prisma'
  | 'react-admin'
  | 'rest-dtos'
  | 'rext-client';

export type AvailableLibraryType = 'angular' | 'nest' | 'react';

export interface HapifyLibraryGeneratorOptionsWithExtra
  extends HapifyLibraryGeneratorOptions,
    Record<string, unknown> {}

export interface HapifyLibraryGeneratorOptions {
  name?: string;
  directory?: string;
  type?: AvailableLibraryType;
  hapifyTemplate: AvailableTractrTemplates;
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
