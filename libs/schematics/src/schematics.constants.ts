import { TargetConfiguration } from '@nrwl/devkit';

import { AvailableTractrTemplates } from './generators/hapify-library/schema';
import { PackageDefinition, PackageType } from './helpers';

export const DEFAULT_IMPORT_REPLACEMENTS = {
  'angular-rext-client': ['rext-client'],
  casl: [],
  dbml: [],
  models: [],
  'nestjs-models': ['nestjs-models-common', 'nestjs-models-rest'],
  'nestjs-graphql': ['nestjs-models-common'],
  'nestjs-models-common': ['models'],
  'nestjs-models-rest': ['casl', 'nestjs-models-common', 'rest-dtos', 'models'],
  prisma: ['nestjs-models', 'nestjs-models-common'],
  'react-admin': ['rext-client'],
  'rest-dtos': ['models'],
  'rext-client': ['models', 'rest-dtos'],
};

export const DEFAULT_SECONDARY_ENTRY_POINTS: Record<string, string[]> = {
  'angular-rext-client': [],
  casl: [],
  dbml: [],
  models: ['mock'],
  'nestjs-models': [],
  'nestjs-graphql': [],
  'nestjs-models-common': ['mock'],
  'nestjs-models-rest': ['mock'],
  prisma: [],
  'react-admin': [],
  'rest-dtos': ['mock'],
  'rext-client': [],
};

export const DEFAULT_LIBRARY_TYPE: Record<AvailableTractrTemplates, string> = {
  'angular-rext-client': 'angular',
  casl: 'nest',
  dbml: 'nest',
  models: 'nest',
  'nestjs-models': 'nest',
  'nestjs-graphql': 'nest',
  'nestjs-models-common': 'nest',
  'nestjs-models-rest': 'nest',
  prisma: 'nest',
  'react-admin': 'react',
  'rest-dtos': 'nest',
  'rext-client': 'angular',
};

export type LibraryUseContext = 'angular' | 'nest' | 'react';
export const DEFAULT_LIBRARY_USE_CONTEXT: Record<
  AvailableTractrTemplates,
  LibraryUseContext[]
> = {
  'angular-rext-client': ['angular'],
  casl: ['nest', 'angular', 'react'],
  dbml: ['nest'],
  models: ['nest', 'angular', 'react'],
  'nestjs-models': ['nest'],
  'nestjs-graphql': ['nest'],
  'nestjs-models-common': ['nest'],
  'nestjs-models-rest': ['nest'],
  prisma: ['nest'],
  'react-admin': ['react'],
  'rest-dtos': ['nest', 'angular', 'react'],
  'rext-client': ['nest', 'angular', 'react'],
};

export const DEFAULT_TARGETS_OPTIONS: Partial<
  Record<
    AvailableTractrTemplates,
    Record<string, Partial<TargetConfiguration> | null>
  >
> = {
  dbml: {
    build: null,
    lint: null,
    generate: {
      options: {
        format: false,
        moveGeneratedFiles: false,
        updateImportPath: false,
      },
    },
  },
};

export const DEFAULT_DEPENDENCIES: Partial<
  Record<AvailableTractrTemplates, PackageDefinition[]>
> = {
  models: [
    { packageName: 'faker', version: '5.5.3', type: PackageType.dependencies },
  ],
  'angular-rext-client': [
    {
      packageName: '@tractr/angular-tools',
      version: 'current',
      type: PackageType.dependencies,
    },
  ],
};
