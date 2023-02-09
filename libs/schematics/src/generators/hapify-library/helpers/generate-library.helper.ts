import { libraryGenerator as angularLibraryGenerator } from '@nrwl/angular/generators';
import { Tree } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import { libraryGenerator as nestLibraryGenerator } from '@nrwl/nest';
import { libraryGenerator as reactLibraryGenerator } from '@nrwl/react';

// We need to import this file to get the @schematics/angular package as a
// dependency of the schematics package
import '@schematics/angular/application/index';
import { cleanAngularLibrary } from './clean-angular-library.helper';
import { cleanNestLibrary } from './clean-nest-library.helper';
import { cleanReactLibrary } from './clean-react-library.helper';
import { NormalizedOptions } from '../schema';

export async function generateLibrary(tree: Tree, options: NormalizedOptions) {
  // Default values for library generator options
  const { name, directory, extra, type, importPath } = options;
  const libraryGeneratorDefaultOptions = {
    buildable: true,
    standaloneConfig: true,
  };
  const libraryGeneratorOptions = { name, directory, importPath, ...extra };

  // Generate the library
  switch (type) {
    case 'angular':
      await angularLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        ...libraryGeneratorOptions,
      });
      cleanAngularLibrary(tree, options);
      break;
    case 'nest':
      await nestLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        ...libraryGeneratorOptions,
      });
      cleanNestLibrary(tree, options);
      break;
    case 'react':
      await reactLibraryGenerator(tree, {
        ...libraryGeneratorDefaultOptions,
        style: 'none',
        skipTsConfig: false,
        skipFormat: false,
        unitTestRunner: 'jest',
        linter: Linter.EsLint,
        ...libraryGeneratorOptions,
      });
      await cleanReactLibrary(tree, options);
      break;
    default:
  }
}
