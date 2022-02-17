---
id: prettier
title: New project - Prettier
sidebar_label: Prettier
---

## Install packages

Install Tractr's configurations for Prettier:

```shell
npm i -D -f @tractr/prettier-config
```

Then, install Prettier's plugins:

```shell
npm i -D -f prettier-plugin-packagejson prettier-plugin-sort-json
```

## Change Prettier config

### `.prettierrc.js`

Replace the `.prettierrc` with the [`.prettierrc.js` from Traxion](https://github.com/tractr/stack/blob/main/.prettierrc.js).
Run the following command:

```shell
rm .prettierrc
curl -o .prettierrc.js https://raw.githubusercontent.com/tractr/stack/main/.prettierrc.js
```

### `.prettierignore`

Override the default `.prettierignore` with the [`.prettierignore` from Traxion](https://github.com/tractr/stack/blob/main/.prettierignore).
Run the following command:

```shell
curl -o .prettierignore https://raw.githubusercontent.com/tractr/stack/main/.prettierignore
```
