---
id: release
title: Release
sidebar_label: Release
---

## Release

Add release configuration to a nx project.

```bash
nx g @tractr/schematics:release <nxProjectName>
```

### Description

Add configuration of [`@jscutlery/semver`](https://github.com/jscutlery/semver) to a nx project.

- Update `workspace.json` to add `targets.release` to the `project`
- Update `package.json` to add the latest version of `@jscutlery/semver`

### Arguments

| Argument | Description                 |
| -------- | --------------------------- |
| `<nxProjectName>` | The nx project name |
