import {
  addDependenciesToPackageJson,
  formatFiles,
  readProjectConfiguration,
  Tree,
  updateJson,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import fetch from 'node-fetch';

import { NormalizedSchema, normalizeOptions } from './normalize-options';

async function addSemverToPackage(tree: Tree) {
  const semverResponse = await fetch(
    'https://registry.npmjs.org/@jscutlery/semver',
  );
  const semver = await semverResponse.json();
  const deployResponse = await fetch(
    'https://registry.npmjs.org/ngx-deploy-npm',
  );
  const deploy = await deployResponse.json();

  return addDependenciesToPackageJson(
    tree,
    {},
    {
      '@jscutlery/semver': semver['dist-tags'].latest,
      'ngx-deploy-npm': deploy['dist-tags'].latest,
    },
  );
}

function updateProject(tree: Tree, options: NormalizedSchema) {
  const project = readProjectConfiguration(tree, options.name);

  project.targets = project.targets || {};
  project.targets.release = {
    executor: '@jscutlery/semver:version',
    options: {
      syncVersions: false,
    },
  };
  project.targets.publish = {
    executor: 'ngx-deploy-npm:deploy',
    options: {
      access: 'public',
    },
  };

  updateProjectConfiguration(tree, options.name, project);
  updateJson(tree, `${options.projectRoot}/package.json`, (json) => {
    const toUpdateJson = { ...json };

    toUpdateJson.repository = {
      type: 'git',
      url: 'https://github.com/tractr/stack',
    };
    toUpdateJson.publishConfig = {
      access: 'restricted',
      registry: 'https://npm.pkg.github.com',
    };

    return toUpdateJson;
  });
}

export default async function addReleaseAndPublishHooks(
  tree: Tree,
  schema: any,
) {
  const options = normalizeOptions(tree, schema);
  updateProject(tree, options);
  await formatFiles(tree);
  return addSemverToPackage(tree);
}
