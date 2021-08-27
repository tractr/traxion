---
id: schematics
title: A complete list of generator's schematics created by Traxion
sidebar_label: Nx Schematics - Generators
---

## How to use the schematics

At the root of your nx project you can use the schematics from `@tractr/schematics`. Fist you need to install this package from npm:

```bash
> npm i --save-dev @tractr/schematics
```

After that you will be able to use the schematics with the `nx` cli:

```bash
> nx g @tractr/schematics:<schematicName> ...
```

## List of schematics

### Release

Add release configuration to a nx project.

```bash
> nx g @tractr/schematics:release <nxProjectName>
```

#### Description

Add configuration of [`@jscutlery/semver`](https://github.com/jscutlery/semver) to a nx project.

- Update `workspace.json` to add `targets.release` to the `project`
- Update `package.json` to add the latest version of `@jscutlery/semver`

#### Arguments

| Argument | Description                 |
| -------- | --------------------------- |
| `<nxProjectName>` | The nx project name |

### Npm publish

Add npm publish configuration to a nx project

```bash
> nx g @tractr/schematics:npm-publish <nxProjectName> <repositoryUrl>
```

#### Description

Add configuration of [`ngx-deploy-npm`](https://github.com/bikecoders/ngx-deploy-npm) to a nx project.

- Update `workspace.json` to add `targets.publish` to the `project`
- Update `package.json` to add the latest version of `ngx-deploy-npm`
- Update `<projectPath>/package.json` to add `repository` and `publishConfig` options

#### Arguments

| Argument | Description                 |
| -------- | --------------------------- |
| `<nxProjectName>` | The nx project name |
| `<repositoryUrl>` | The git url use to host the workspace |

#### Options

| Option                         | Description                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `--registry [registryUrl]` | The registry url to push the npm package (default to: `https://npm.pkg.github.com`).<br/> Alias: `-r` |                        |
| `--access [access]` | The npm publish access level `public` or `retricted` (default to: `restricted`). |                        |
