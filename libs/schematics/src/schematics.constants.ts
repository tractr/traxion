import { TargetConfiguration } from '@nrwl/devkit';

import { PackageDefinition, PackageType } from './helpers';

export type AvailableTraxionTemplates =
  | 'angular-rext-client'
  | 'casl'
  | 'models'
  | 'nestjs-models'
  | 'nestjs-graphql'
  | 'nestjs-models-common'
  | 'nestjs-models-rest'
  | 'prisma'
  | 'react-admin'
  | 'rest-dtos'
  | 'rext-client';

export type LibraryType = 'angular' | 'nest' | 'react';

export const DEFAULT_LIBRARY_NAMES: AvailableTraxionTemplates[] = [
  'angular-rext-client',
  'casl',
  'models',
  'nestjs-models',
  'nestjs-graphql',
  'nestjs-models-common',
  'nestjs-models-rest',
  'prisma',
  'react-admin',
  'rest-dtos',
  'rext-client',
];

export const DEFAULT_LIBRARY_DESCRIPTIONS: Record<
  AvailableTraxionTemplates,
  string
> = {
  'angular-rext-client':
    'Create a REST client that use the generated RextClient',
  casl: 'Host the casl configuration',
  models: 'Create the typescript models used in front and back context',
  'nestjs-models': 'Configure the models in nestjs context',
  'nestjs-graphql': 'Expose graphql resolver',
  'nestjs-models-common': 'Expose common services to use the database',
  'nestjs-models-rest': 'Expose controllers to use in the nestjs context',
  prisma: 'Build the prisma schema',
  'react-admin': 'Expose a react admin configuration to use it on the go',
  'rest-dtos': 'Expose the dtos that will be use in front and back',
  'rext-client': 'Create a JS library plug into the REST api generated',
};

export const DEFAULT_IMPORT_REPLACEMENTS: Record<
  AvailableTraxionTemplates,
  AvailableTraxionTemplates[]
> = {
  'angular-rext-client': ['rext-client'],
  casl: [],
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
export const DEFAULT_IMPLICIT_DEPENDENCIES: Record<
  AvailableTraxionTemplates,
  string[]
> = {
  'angular-rext-client': ['common-rext-client'],
  casl: [],
  models: [],
  'nestjs-models': ['nestjs-models-common', 'nestjs-models-rest'],
  'nestjs-graphql': ['nestjs-casl'],
  'nestjs-models-common': ['common-models'],
  'nestjs-models-rest': [
    'common-casl',
    'nestjs-models-common',
    'common-rest-dtos',
    'common-models',
  ],
  prisma: ['nestjs-models', 'nestjs-models-common'],
  'react-admin': ['common-rext-client'],
  'rest-dtos': ['common-models'],
  'rext-client': ['common-models', 'common-rest-dtos'],
};

export const DEFAULT_SECONDARY_ENTRY_POINTS: Record<
  AvailableTraxionTemplates,
  string[]
> = {
  'angular-rext-client': [],
  casl: [],
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

export const DEFAULT_LIBRARY_TYPE: Record<
  AvailableTraxionTemplates,
  LibraryType
> = {
  'angular-rext-client': 'angular',
  casl: 'nest',
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

export const DEFAULT_LIBRARY_ROOT_DIRECTORY: Record<
  AvailableTraxionTemplates,
  string | undefined
> = {
  'angular-rext-client': 'angular',
  casl: 'common',
  models: 'common',
  'nestjs-models': 'nestjs',
  'nestjs-graphql': 'nestjs',
  'nestjs-models-common': 'nestjs',
  'nestjs-models-rest': 'nestjs',
  prisma: undefined,
  'react-admin': 'react',
  'rest-dtos': 'common',
  'rext-client': 'common',
};

export const DEFAULT_LIBRARY_DIRECTORY: Record<
  AvailableTraxionTemplates,
  string
> = {
  'angular-rext-client': 'rext-client',
  casl: 'casl',
  models: 'models',
  'nestjs-models': 'models',
  'nestjs-graphql': 'graphql',
  'nestjs-models-common': 'models-common',
  'nestjs-models-rest': 'models-rest',
  prisma: 'prisma',
  'react-admin': 'admin',
  'rest-dtos': 'rest-dtos',
  'rext-client': 'rext-client',
};

export const DEFAULT_LIBRARY_USE_CONTEXT: Record<
  AvailableTraxionTemplates,
  LibraryType[]
> = {
  'angular-rext-client': ['angular'],
  casl: ['nest', 'angular', 'react'],
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
    AvailableTraxionTemplates,
    Record<string, Partial<TargetConfiguration> | null>
  >
> = {};

export const DEFAULT_DEPENDENCIES: Partial<
  Record<AvailableTraxionTemplates, PackageDefinition[]>
> = {
  models: [
    { packageName: 'faker', version: '5.5.3', type: PackageType.dependencies },
  ],
  'angular-rext-client': [
    {
      packageName: '@trxn/angular-tools',
      version: 'current',
      type: PackageType.dependencies,
    },
  ],
};
