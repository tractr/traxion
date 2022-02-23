import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function createSrcIndexTs(
  tree: Tree,
  options: NormalizedOptions,
  entrypoint = '',
) {
  const { projectRoot } = options;

  const srcIndexPath = join(
    projectRoot,
    entrypoint === '' ? 'src' : `${entrypoint}/src`,
    'index.ts',
  );

  tree.delete(srcIndexPath);
  tree.write(
    srcIndexPath,
    options.hapifyTemplates
      .map(
        (template) =>
          `export * from './generated/${template}${
            entrypoint === '' ? '' : `/${entrypoint}`
          }';\n`,
      )
      .join(''),
  );
}
