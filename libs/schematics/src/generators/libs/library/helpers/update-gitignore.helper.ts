import { join } from 'path';

import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export function updateGitIgnoreEntry(host: Tree, options: NormalizedOptions) {
  const gitIgnorePath = join(options.projectRoot, '.gitignore');
  if (!host.exists(gitIgnorePath)) host.write(gitIgnorePath, '');

  let content = host.read(gitIgnorePath, 'utf-8') || '';
  if (!/^hapify.json$/gm.test(content)) {
    content += '\nhapify.json\n';
  }
  if (!/^generated$/gm.test(content)) {
    content += '\ngenerated\n';
  }
  host.write(gitIgnorePath, content);
}
