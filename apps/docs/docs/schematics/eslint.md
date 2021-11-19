---
id: eslint
title: Eslint
sidebar_label: Eslint
---

## Eslint config

Add and configure eslint configuration to a nx project

```bash
nx g @tractr/schematics:eslint-config
```

### Description

Add and configure prettier [`@tractr/eslint-config`](https://github.com/tractr/stack/tree/main/libs/config/eslint) to a nx project.

- Generate the eslint first configuration from `@nrwl/linter` module
- Add specifique configuration to `.eslintrc.json` to set the `import/internal-regex` and the rules of `import/no-unresolved`
- Update `package.json` to add the latest version of `@tractr/eslint-config` and these eslint packages: `eslint-config-airbnb-base`, `eslint-config-prettier`, `eslint-import-resolver-alias`, `eslint-import-resolver-typescript`, `eslint-import-resolver-webpack`, `eslint-plugin-cypress`, `eslint-plugin-import`, `eslint-plugin-jest`, `eslint-plugin-json-files`

### Options

No options is provided for this package
