---
id: eslint-prettier
title: New project - ESLint & Prettier
sidebar_label: ESLint & Prettier
---

## Add ESLint and Prettier custom configs

### Install packages

Install Tractr's configurations for ESLint and Prettier:

```shell
npm i -D -f @tractr/eslint-config @tractr/prettier-config
```

Then, install Prettier's plugins:

```shell
npm i -D -f prettier-plugin-packagejson prettier-plugin-sort-json
```

And ESLint plugins:

```shell
npm i -D -f eslint-config-airbnb-base eslint-config-prettier eslint-import-resolver-alias eslint-import-resolver-typescript eslint-import-resolver-webpack eslint-plugin-cypress eslint-plugin-import eslint-plugin-jest eslint-plugin-json-files
```

### Change ESLint and Prettier config

#### `.eslintrc.json`

Override the default `.eslintrc.json` with the [`.eslintrc.json` from Traxion](https://github.com/tractr/stack/blob/main/.eslintrc.json).
Run the following command:

```shell
curl -o .eslintrc.json https://raw.githubusercontent.com/tractr/stack/main/.eslintrc.json
```

#### `.prettierrc.js`

Replace the `.prettierrc` with the [`.prettierrc.js` from Traxion](https://github.com/tractr/stack/blob/main/.prettierrc.js).
Run the following command:

```shell
rm .prettierrc
curl -o .prettierrc.js https://raw.githubusercontent.com/tractr/stack/main/.prettierrc.js
```

#### `.eslintignore`

Override the default `.eslintignore` (if any) with the [`.eslintignore` from Traxion](https://github.com/tractr/stack/blob/main/.eslintignore).
Run the following command:

```shell
curl -o .eslintignore https://raw.githubusercontent.com/tractr/stack/main/.eslintignore
```

#### `.prettierignore`

Override the default `.prettierignore` with the [`.prettierignore` from Traxion](https://github.com/tractr/stack/blob/main/.prettierignore).
Run the following command:

```shell
curl -o .prettierignore https://raw.githubusercontent.com/tractr/stack/main/.prettierignore
```
