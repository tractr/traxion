import { Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { addFiles } from './add-files.helper';
import { NormalizedSchema } from './normalize-options.helper';

describe('addFiles', () => {
  let tree: Tree;
  const applicationRoot = 'apps/admin';
  const options: Required<NormalizedSchema & { applicationRoot: string }> = {
    name: 'admin',
    directory: 'test',
    npmScope: '@tractr',
    npmName: '@tractr/test-admin',
    reactAdminImportPath: '@tractr/react-admin',
    rextClientImportPath: '@tractr/rext-client',
    projectRoot: 'apps/test/admin',
    projectName: 'test-admin',
    projectDirectory: 'test/admin',
    applicationRoot,
    skipInstall: false,
    extra: {},
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should add "proxy.conf.js" file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/proxy.conf.js`)).toEqual(true);
  });

  it('should add "package.json" file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/package.json`)).toEqual(true);
    // file should have been rendered with ejs
    expect(
      tree
        .read(`${applicationRoot}/src/environments/environment.default.ts`)
        ?.toString()
        .includes(options.npmName),
    );
  });

  it('should add "Dockerfile" file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/Dockerfile`)).toEqual(true);
  });

  it('should add nginx configuration file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/nginx/default.conf`)).toEqual(true);
  });

  it('should add "src/interfaces" files', () => {
    addFiles(tree, options);

    expect(
      tree.exists(
        `${applicationRoot}/src/interfaces/admin-config.interface.ts`,
      ),
    ).toEqual(true);
  });

  it('should add "src/environments" files', () => {
    addFiles(tree, options);

    expect(
      tree.exists(`${applicationRoot}/src/environments/environment.ts`),
    ).toEqual(true);
    expect(
      tree.exists(`${applicationRoot}/src/environments/environment.prod.ts`),
    ).toEqual(true);
    expect(
      tree.exists(`${applicationRoot}/src/environments/environment.default.ts`),
    ).toEqual(true);
    // file should have been rendered with ejs
    expect(
      tree
        .read(`${applicationRoot}/src/environments/environment.default.ts`)
        ?.toString()
        .includes(options.rextClientImportPath),
    );
  });

  it('should add "src/app" files', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/src/app/app.tsx`)).toEqual(true);
    // file should have been rendered with ejs
    expect(
      tree
        .read(`${applicationRoot}/src/app/app.tsx`)
        ?.toString()
        .includes(options.reactAdminImportPath),
    );
  });

  it('should add "src/config.ts" file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/src/config.ts`)).toEqual(true);
  });

  it('should add "src/main.tsx" file', () => {
    addFiles(tree, options);

    expect(tree.exists(`${applicationRoot}/src/main.tsx`)).toEqual(true);
  });
});
