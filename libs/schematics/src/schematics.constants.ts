export type TraxionListPackages =
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

export type LibraryType = 'angular' | 'nest' | 'react' | 'ts';

export const DEFAULT_TRAXION_DIRECTORY: Record<TraxionListPackages, string> = {
  'angular-rext-client': 'angular',
  casl: 'common',
  models: 'common',
  'nestjs-models': 'nestjs',
  'nestjs-graphql': 'nestjs',
  'nestjs-models-common': 'nestjs',
  'nestjs-models-rest': 'nestjs',
  prisma: '',
  'react-admin': 'react',
  'rest-dtos': 'common',
  'rext-client': 'common',
};

export const DEFAULT_TRAXION_NAME: Record<TraxionListPackages, string> = {
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

/**
 * List of packages dependencies
 */
export const DEFAULT_TRAXION_PACKAGES_DEPS: Record<
  TraxionListPackages,
  TraxionListPackages[]
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

/**
 * Configure which secondary entry points are available for each library
 * (Used to declare the mock entry point)
 */
export const DEFAULT_SECONDARY_ENTRY_POINTS: Record<
  TraxionListPackages,
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

/**
 * Get the default target library to use during the generation
 */
export const DEFAULT_LIBRARY_TYPE: Record<TraxionListPackages, LibraryType> = {
  'angular-rext-client': 'angular',
  casl: 'ts',
  models: 'ts',
  'nestjs-models': 'nest',
  'nestjs-graphql': 'nest',
  'nestjs-models-common': 'nest',
  'nestjs-models-rest': 'nest',
  prisma: 'ts',
  'react-admin': 'react',
  'rest-dtos': 'nest',
  'rext-client': 'ts',
};

export type LibraryUseContext = 'angular' | 'nest' | 'react';

export const DEFAULT_LIBRARY_USE_CONTEXT: Record<
  TraxionListPackages,
  LibraryUseContext[]
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

export const DEFAULT_EXTERNALS_DEPENDENCIES: Partial<
  Record<TraxionListPackages, Record<string, string>>
> = {
  models: { faker: '5.5.3' },
  'angular-rext-client': { '@tractr/angular-tools': 'current' },
};
