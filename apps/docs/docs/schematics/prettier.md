---
id: prettier
title: Prettier
sidebar_label: Prettier
---

## Prettier config

Add prettier and its configuration to a NX project.

```bash
nx g @tractr/schematics:prettier-config
```

### Description

Add and configure Prettier [`@tractr/prettier-config`](https://github.com/tractr/stack/tree/main/libs/config/prettier) to a NX project.

The following steps will be performed:

- Remove `.prettierrc` file
- Create `.prettierrc.js` file with default import from `@tractr/prettier-config`
- Update `package.json` to add the latest version of `@tractr/prettier-config`

### Options

| Option     | Description                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `--format` | Format the all NX workspace to ensure all files have been processed by Prettier                                 |
