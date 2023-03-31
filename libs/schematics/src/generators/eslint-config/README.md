# Eslint config

Add ESLint and its configuration to a NX project.

```shell
nx g @trxn/schematics:eslint-config
```

## Description

Add and configure ESLint [`@trxn/eslint-config`](https://github.com/tractr/stack/tree/main/libs/config/eslint) to a NX project.

The following steps will be performed:

- Generate the ESLint base configuration from `@nrwl/linter` module.
- Add specific configuration to `.eslintrc.json` to set the `import/internal-regex` and the rules of `import/no-unresolved`
- Update `package.json` to add the latest version of `@trxn/eslint-config` and these ESLint packages:
  - `eslint-config-airbnb-base`
  - `eslint-config-prettier`
  - `eslint-import-resolver-alias`
  - `eslint-import-resolver-typescript`
  - `eslint-import-resolver-webpack`
  - `eslint-plugin-cypress`
  - `eslint-plugin-import`
  - `eslint-plugin-jest`
  - `eslint-plugin-json-files`

## Options

No options are provided for this package.
