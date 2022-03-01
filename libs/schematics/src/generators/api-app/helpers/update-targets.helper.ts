import { Tree } from '@nrwl/devkit';

import {
  readTargetConfiguration,
  updateTargetConfiguration,
} from '../../../helpers';
import { NormalizedOptions } from '../schema';

export function updateTargets(
  tree: Tree,
  normalizedOptions: NormalizedOptions,
) {
  const { name } = normalizedOptions;

  const build = readTargetConfiguration(tree, name, 'build');
  updateTargetConfiguration(tree, name, 'build', {
    ...build,
    options: {
      ...build.options,
      tsPlugins: [
        ...new Set([
          ...(build.options.tsPlugins || []),
          '@nestjs/swagger/plugin',
        ]),
      ],
    },
  });
}
