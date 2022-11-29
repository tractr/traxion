# Prettier config

Add prettier and its configuration to a NX project.

```shell
nx g @trxn/schematics:prettier-config
```

## Description

Add and configure Prettier [`@trxn/prettier-config`](https://github.com/tractr/stack/tree/main/libs/config/prettier) to a NX project.

The following steps will be performed:

- Remove `.prettierrc` file
- Create `.prettierrc.js` file with default import from `@trxn/prettier-config`
- Update `package.json` to add the latest version of `@trxn/prettier-config`

## Options

| Option     | Description                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `--format` | Format the all NX workspace to ensure all files have been processed by Prettier                                 |
