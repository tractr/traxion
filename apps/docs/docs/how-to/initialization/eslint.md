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

Override the default `.eslintrc.json` with the [`.eslintrc.json` from Traxion](https://github.com/tractr/stack/blob/main/.eslintrc.json).
Run the following command:

```shell
curl -o .eslintrc.json https://raw.githubusercontent.com/tractr/stack/main/.eslintrc.json
```

### `.eslintignore`

Override the default `.eslintignore` (if any) with the [`.eslintignore` from Traxion](https://github.com/tractr/stack/blob/main/.eslintignore).
Run the following command:

```shell
curl -o .eslintignore https://raw.githubusercontent.com/tractr/stack/main/.eslintignore
```
