---
id: publish
title: Publish
sidebar_label: Publish
---

## Npm publish

Add npm publish configuration to a nx project

```bash
nx g @tractr/schematics:npm-publish <nxProjectName> <repositoryUrl>
```

### Description

Add configuration of [`ngx-deploy-npm`](https://github.com/bikecoders/ngx-deploy-npm) to a nx project.

- Update `workspace.json` to add `targets.publish` to the `project`
- Update `package.json` to add the latest version of `ngx-deploy-npm`
- Update `<projectPath>/package.json` to add `repository` and `publishConfig` options

### Arguments

| Argument | Description                 |
| -------- | --------------------------- |
| `<nxProjectName>` | The nx project name |
| `<repositoryUrl>` | The git url use to host the workspace |

### Options

| Option                         | Description                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `--registry [registryUrl]` | The registry url to push the npm package (default to: `https://npm.pkg.github.com`).<br/> Alias: `-r` |                        |
| `--access [access]` | The npm publish access level `public` or `retricted` (default to: `restricted`). |
