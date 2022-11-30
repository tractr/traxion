# NPM publish

Add npm publish configuration to a NX project

```shell
nx g @trxn/schematics:npm-publish <nxProjectName> <repositoryUrl>
```

## Description

Add configuration of [`ngx-deploy-npm`](https://github.com/bikecoders/ngx-deploy-npm) to a NX project.

The following steps will be performed:

- Update `workspace.json` to add `targets.publish` to the `project`
- Update `package.json` to add the latest version of `ngx-deploy-npm`
- Update `<projectPath>/package.json` to add `repository` and `publishConfig` options

## Arguments

| Argument          | Description                            |
| ----------------- | -------------------------------------- |
| `<nxProjectName>` | The NX project name                    |
| `<repositoryUrl>` | The git url used to host the workspace |

## Options

| Option                         | Description                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `--registry [registryUrl]`     | The NPM registry url used to push the package (default to: `https://npm.pkg.github.com`).<br/> Alias: `-r`            |
| `--access [access]`            | The npm publish access level: `public` or `retricted` (default to: `restricted`).                                     |
