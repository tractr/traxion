import { getWorkspaceLayout, Tree } from '@nrwl/devkit';

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
  const { appsDir } = getWorkspaceLayout(tree);

  updateTargetConfiguration(tree, name, 'preserve', {
    configurations: {
      development: {},
      production: {},
    },
    executor: '@nrwl/workspace:run-commands',
    options: {
      commands: [
        `npx tractr-angular-config-generate ./${appsDir}/${name}/src/assets/app-config.json`,
      ],
      parallel: false,
    },
  });

  const serve = readTargetConfiguration(tree, name, 'serve');
  updateTargetConfiguration(tree, name, 'serve', {
    ...serve,
    dependsOn: [
      {
        projects: 'self',
        target: 'preserve',
      },
    ],
  });

  const build = readTargetConfiguration(tree, name, 'build');
  updateTargetConfiguration(tree, name, 'build', {
    ...build,
    options: {
      ...build.options,
      styles: [
        ...build.options.styles,
        'node_modules/ng-zorro-antd/ng-zorro-antd.min.css',
      ],
      allowedCommonJsDependencies: [
        'validator',
        '@prisma/client',
        '@trxn/common',
      ],
    },
  });
}
