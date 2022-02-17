---
id: eslint
title: New project - ESLint
sidebar_label: ESLint
---

## Install packages

Install Tractr's configurations for ESLint:

```shell
npm i -D -f @tractr/eslint-config
```

Then, install ESLint plugins:

```shell
npm i -D -f eslint-config-airbnb-base \
            eslint-config-prettier \
            eslint-import-resolver-alias \
            eslint-import-resolver-typescript \
            eslint-import-resolver-webpack \
            eslint-plugin-cypress \
            eslint-plugin-import \
            eslint-plugin-jest \
            eslint-plugin-json-files
```

## Change ESLint config

### `.eslintrc.json`

In the `.eslintrc.json` file, add the rule `import/no-unresolved` (after `@nrwl/nx/enforce-module-boundaries`):

```json lines
"import/no-unresolved": [
  "error",
  {
    "ignore": ["^@(tractr|generated|traxion)/"]
  }
]
```

then, add the setting `import/extensions` (under `settings`):

```json lines
"import/internal-regex": "^@(generated)/"
```

### `.eslintignore`

Create a `.eslintignore` file with the following content:

```ignore
generated
```
