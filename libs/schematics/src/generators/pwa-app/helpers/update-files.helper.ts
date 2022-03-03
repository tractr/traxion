import { join } from 'path';

import { generateFiles, Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function updateFiles(tree: Tree, normalizedOptions: NormalizedOptions) {
  const { appsDir, name } = normalizedOptions;
  const pwaPath = join(appsDir, name);
  const appPath = join(pwaPath, 'src', 'app');

  // delete some files
  tree.delete(join(appPath, 'app.component.html'));
  tree.delete(join(appPath, 'app.component.less'));
  tree.delete(join(appPath, 'app.component.spec.ts'));
  tree.delete(join(appPath, 'app.component.ts'));
  tree.delete(join(appPath, 'nx-welcome.component.ts'));

  // Generate the pwa files
  generateFiles(tree, join(__dirname, '..', 'files'), join(appsDir, name), {
    ...normalizedOptions,
    template: '',
  });

  // Update polyfill eslint error
  const polyfill = (
    tree.read(join(pwaPath, 'src', 'polyfill.ts')) || ''
  ).toString();

  tree.write(
    join(pwaPath, 'src', 'polyfill.ts'),
    polyfill.replaceAll(/\/\*\*\*.*/g, '/**'),
  );

  const gitignore = tree.read('.gitignore')?.toString() || '';

  const assetsPath = join(pwaPath, 'src', 'assets', 'app-config.json');
  if (!gitignore.includes(assetsPath))
    tree.write(
      '.gitignore',
      `${gitignore}\n\n# Pwa app config\n${assetsPath}\n`,
    );
}
