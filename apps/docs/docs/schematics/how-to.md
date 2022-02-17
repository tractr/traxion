---
id: how-to
title: How to use the schematics
sidebar_label: How to
---

## How to use the schematics

From the root of your NX project you can use the schematics from `@tractr/schematics`.
First, you need to install this package with `npm`:

```bash
npm i --save-dev @tractr/schematics
```

After that, you will be able to use the schematics with the `nx` cli:

```bash
nx g @tractr/schematics:<schematicName> ...
```

:::caution

  Some schematics add dependencies in `package.json` but don't run `npm install` for you. You will need to run `npm install --force` yourself.
  
:::
