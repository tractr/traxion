---
id: dev-tools-and-ci
title: New project - Dev tools and CI
sidebar_label: Dev Tools and CI
---

## Commitlint installation

Install the dependencies with the following command:

```shell
npm i -D @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog
```

```shell
npm i -D @tractr/commit-config
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

# Husky installation

Install husky: `npm i -D husky`.

- Add .husky directory with husky config to the repository.
- Add the `postinstall` script to the `package.json`.
- Add the `.github` directory to the project root.

- Add the gitactions secrets in github interface.
- Add docker builds and dockerfiles in the applications.
