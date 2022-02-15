export type AvailableTractrTemplates =
  | 'angular-rext-client'
  | 'casl'
  | 'dbml'
  | 'models'
  | 'nestjs-models'
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
  name: string;
  directory?: string;
  type: AvailableLibraryType;
  hapifyTemplates: AvailableTractrTemplates[];
  hapifyAdditionalTemplates: string;
  hapifyModelsJson: string;
  hapifyUseImportReplacements: boolean;
  useSecondaryEndpoint: boolean;
  addSecondaryEndpoint: string[];
}

export interface NormalizedOptions extends HapifyLibraryGeneratorOptions {
  npmScope: string;
  libsDir: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
  importPath: string;
  hapifyModelsJsonRelativePath: string;
  templates: string[];
  hapifyImportReplacements: string[];
  secondaryEntrypoints: string[];
  defaultTargetGenerateOptions: Record<string, unknown>;
  extra: Record<Record, unknown>;
}
