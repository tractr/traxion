import { Linter } from '@nrwl/linter';

type AngularLinter = Exclude<Linter, Linter.TsLint>;

export interface LibraryGeneratorOptions
  extends AngularLibraryGeneratorOptions,
    NestjsLibraryGeneratorOptions,
    TractrLibraryGeneratorOptions {}

export interface NormalizedOptions extends TractrLibraryGeneratorOptions {
  fileName: string;
  name: string;
  prefix: string;
  projectDirectory: string;
  projectName: string;
  projectRoot: string;
  hapifyModelsJsonRelativePath: string;
  templates: string[];
  hapifyImportReplacements: string[];
}

export interface TractrLibraryGeneratorOptions {
  type: 'angular' | 'nest';
  hapifyTemplates: AvailableTractrTemplates[];
  hapifyAdditionalTemplates: string;
  hapifyModelsJson: string;
  hapifyUseImportReplacements: boolean;
}

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

export interface AngularLibraryGeneratorOptions {
  name: string;
  addTailwind?: boolean;
  skipFormat?: boolean;
  simpleModuleName?: boolean;
  addModuleSpec?: boolean;
  directory?: string;
  sourceDir?: string;
  buildable?: boolean;
  publishable?: boolean;
  importPath?: string;
  standaloneConfig?: boolean;
  spec?: boolean;
  flat?: boolean;
  commonModule?: boolean;
  prefix?: string;
  routing?: boolean;
  lazy?: boolean;
  parentModule?: string;
  tags?: string;
  strict?: boolean;
  linter?: AngularLinter;
  unitTestRunner?: UnitTestRunner;
  compilationMode?: 'full' | 'partial';
  setParserOptionsProject?: boolean;
}

export interface NestjsLibraryGeneratorOptions {
  name: string;
  buildable?: boolean;
  controller?: boolean;
  directory?: string;
  global?: boolean;
  importPath?: string;
  linter?: Exclude<Linter, Linter.TsLint>;
  publishable?: boolean;
  service?: boolean;
  skipFormat?: boolean;
  skipTsConfig?: boolean;
  strict?: boolean;
  tags?: string;
  target?:
    | 'es5'
    | 'es6'
    | 'esnext'
    | 'es2015'
    | 'es2016'
    | 'es2017'
    | 'es2018'
    | 'es2019'
    | 'es2020';
  testEnvironment?: 'jsdom' | 'node';
  unitTestRunner?: UnitTestRunner;
  standaloneConfig?: boolean;
  setParserOptionsProject?: boolean;
}
