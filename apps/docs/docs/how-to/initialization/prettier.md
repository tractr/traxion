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

Remove the default `.prettierrc`:

```shell
rm .prettierrc
```

Create a new `.prettierrc.js` with the following content:

```javascript
const prettierConfig = require('@tractr/prettier-config');

module.exports = {
  ...prettierConfig,
};
```

### `.prettierignore`

Add the following lines to `.prettierignore`:

```ignore
**/*.md
*.local-ignore*
**/hapify.json
```
