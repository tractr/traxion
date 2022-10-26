import { Tree, updateJson } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';
import { createAngularLibrary } from './create-angular-library.helper';
import { createNestLibrary } from './create-nest-library.helper';
import { createReactLibrary } from './create-react-library.helper';
import { createTsLibrary } from './create-ts-library.helper';

export async function generateLibrary(tree: Tree, options: NormalizedOptions) {
  const { type } = options;

  switch (type) {
    case 'angular':
      await createAngularLibrary(tree, options);
      break;
    case 'nest':
      await createNestLibrary(tree, options);
      break;
    case 'react':
      await createReactLibrary(tree, options);
      break;
    case 'ts':
      await createTsLibrary(tree, options);
      break;
    default:
  }

  const { importPath, libsDir, projectDirectory } = options;

  tree.write(`${libsDir}/${projectDirectory}/package.json`, JSON.stringify({}));
  updateJson(tree, `${libsDir}/${projectDirectory}/package.json`, (json) => ({
    version: '0.0.1',
    ...json,
    name: importPath,
  }));
}
