---
id: prettier
title: Prettier
sidebar_label: Prettier
---

## Prettier config

Add and configure prettier configuration to a nx project

```bash
nx g @tractr/schematics:prettier-config
```

### Description

Add and configure prettier [`@tractr/prettier-config`](https://github.com/tractr/stack/tree/main/libs/config/prettier) to a nx project.

- Remove `.prettierrc` file
- Create `.prettierrc.js` file with default import from `@tractr/prettier-config`
- Update `package.json` to add the latest version of `@tractr/prettier-config`

### Options

| Option                         | Description                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `--format` | Format the all nx workspace to ensure all file has been pass through prettier |                        |
