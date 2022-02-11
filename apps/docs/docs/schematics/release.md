---
id: release
title: Release
sidebar_label: Release
---

## Release

Add release configuration to a NX project.

```bash
nx g @tractr/schematics:release <nxProjectName>
```

### Description

Add configuration of [`@jscutlery/semver`](https://github.com/jscutlery/semver) to a NX project.

The following steps will be performed:

- Update `workspace.json` to add `targets.release` to the `project`
- Update `package.json` to add the latest version of `@jscutlery/semver`

### Arguments

| Argument          | Description                 |
| ----------------- | --------------------------- |
| `<nxProjectName>` | The NX project name         |
