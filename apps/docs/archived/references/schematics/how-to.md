---
id: how-to
title: How to use the schematics
sidebar_label: How to
---

## Use an existing schematic

From the root of your NX project you can use the schematics from `@trxn/schematics`.
First, you need to install this package with `npm`:

```shell
npm i --save-dev @trxn/schematics
```

After that, you will be able to use the schematics with the `nx` cli:

```shell
nx g @trxn/schematics:<schematicName> ...
```

:::caution

  Some schematics add dependencies in `package.json` but don't run `npm install` for you. You will need to run `npm install --force` yourself.
  
:::

## Create a new schematic

To create a new schematic you can use the `nx-plugin:generator` schematic from `@nrwl`.

```shell
nx g @nrwl/nx-plugin:generator <schematicName> --project=schematics
```

