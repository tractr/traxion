import { formatFiles, readJsonFile, Tree, updateJson } from '@nrwl/devkit';
import { Linter, lintInitGenerator } from '@nrwl/linter';

import * as packageJson from '../../../package.json';
import { addPackageToPackageJson, PackageDefinition } from '../../helpers';

export const packagesToAdd: PackageDefinition[] = [
  {
    packageName: '@tractr/eslint-config',
    version: packageJson.version,
  },
  { packageName: 'eslint-config-airbnb-base' },
  { packageName: 'eslint-config-prettier' },
  { packageName: 'eslint-import-resolver-alias' },
  { packageName: 'eslint-import-resolver-typescript' },
  { packageName: 'eslint-import-resolver-webpack' },
  { packageName: 'eslint-plugin-cypress' },
  { packageName: 'eslint-plugin-import' },
  { packageName: 'eslint-plugin-jest' },
  { packageName: 'eslint-plugin-json-files' },
];

export default async function eslintGenerator(tree: Tree) {
  // First add dependencies to the package json
  await addPackageToPackageJson(tree, packagesToAdd);

  // Use the linit generator from @nrwl/linter with Eslint
  lintInitGenerator(tree, { linter: Linter.EsLint });

  // Add settings to the eslintrc.json files
  const eslintrcJson = readJsonFile('./.eslintrc.json');
  eslintrcJson.settings = {
    ...eslintrcJson.settings,
    'import/internal-regex': '^@(generated)/',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eslintrcJson.overrides = eslintrcJson.overrides.map((override: any) => {
    if (!override.rules['@nrwl/nx/enforce-module-boundaries']) return override;

    return {
      ...override,
      rules: {
        ...override.rules,
        'import/no-unresolved': [
          'error',
          {
            ignore: ['^@(tractr|generated|traxion)/'],
          },
        ],
      },
    };
  });

  updateJson(tree, '.eslintrc.json', () => eslintrcJson);

  await formatFiles(tree);
}
