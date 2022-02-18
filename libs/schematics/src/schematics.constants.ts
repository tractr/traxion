import { TargetConfiguration } from '@nrwl/devkit';

import { AvailableTractrTemplates } from './generators/hapify-library/schema';
import { Packages, PackageType } from './helpers';

export const DEFAULT_IMPORT_REPLACEMENTS = {
  'angular-rext-client': ['rext-client'],
  casl: [],
  dbml: [],
  models: [],
  'nestjs-models': ['nestjs-models-common', 'nestjs-models-rest'],
  'nestjs-models-common': ['models'],
  'nestjs-models-rest': ['casl', 'nestjs-models-common', 'rest-dtos', 'models'],
  prisma: [],
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
  'nestjs-models-common': 'nest',
  'nestjs-models-rest': 'nest',
  prisma: 'nest',
  'react-admin': 'react',
  'rest-dtos': 'nest',
  'rext-client': 'angular',
};

export const DEFAULT_TARGETS_OPTIONS: Partial<
  Record<
    AvailableTractrTemplates,
    Record<string, Partial<TargetConfiguration> | null>
  >
> = {
  dbml: {
    build: null,
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
  Record<AvailableTractrTemplates, Packages>
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
