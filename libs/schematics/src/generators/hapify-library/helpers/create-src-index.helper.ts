import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function createSrcIndexTs(
  tree: Tree,
  options: NormalizedOptions,
  entrypoint = '',
) {
  const { projectRoot } = options;

  tree.delete(join(projectRoot, 'src', 'index.ts'));
  tree.write(
    join(
      projectRoot,
      entrypoint === '' ? 'src' : `${entrypoint}/src`,
      'index.ts',
    ),
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
