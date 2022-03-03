import {
  installPackagesTask as installPackagesTaskNx,
  Tree,
} from '@nrwl/devkit';

export function installPackagesTask(
  tree: Tree,
  { skipInstall }: { skipInstall?: boolean } = { skipInstall: false },
) {
  const skip = process.env.NX_SKIP_INSTALL === 'true' || skipInstall;

  if (!skip) installPackagesTaskNx(tree);
}
