---
id: commitlint-husky
title: New project - Commitlint and Husky
sidebar_label: Commitlint and Husky
---

## Commitlint installation

Install the dependencies with the following command:

```shell
npm i -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog
```

```shell
npm i -D -f @tractr/commit-config
```

### Create file `.commitlintrc.js`

Use the following content: 

```javascript
module.exports = {
  extends: ['@tractr/commit-config'],
};
```

### Create file `.czrc`

Use the following content:

```json
{
  "path": "cz-conventional-changelog"
}
```

### Create file `.lintstagedrc`

Use the following content:

```json
{
  "*.{js,jsx,ts,tsx,md,html,css,json}": "prettier --write",
  "*.{js,jsx,ts,tsx,html,json}": "eslint --fix"
}
```

## Husky installation

Install dependencies with the following command:

```shell
npm i -D husky is-ci
```

### Create Husky hooks

Create a directory `.husky`:

```shell
mkdir -p .husky
```

In this `.husky` folder, add the following files:

`.gitignore` with content:

```ignore
_
```

`commit-msg` with content:

```shell
#!/bin/sh

# shellcheck disable=SC1091
. "$(dirname "$0")/_/husky.sh"

npm_config_yes=true npx tractr-commitlint --edit "$1"
```

`pre-commit` with content:

```shell
#!/bin/sh

# shellcheck disable=SC1091
. "$(dirname "$0")/_/husky.sh"

npm_config_yes=true npx lint-staged
```

`prepare-commit-msg` with content:

```shell
#!/bin/sh

# shellcheck disable=SC1091
. "$(dirname "$0")/_/husky.sh"

if [ -z ${2+x} ]
then
    # shellcheck disable=SC2015
    exec < /dev/tty && npm_config_yes=true npx tractr-commit --hook || true
fi
```

### Install Husky hooks

In `package.json`, add (or replace) the `postinstall` script (under `scripts`):

```json lines
"postinstall": "(is-ci || husky install) && ngcc --properties es2015 browser module main"
```
