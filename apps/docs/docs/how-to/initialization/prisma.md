---
id: prisma
title: New project - Prisma
sidebar_label: Prisma
---

## Install Prisma

Install prisma packages by running the following command:

```shell
npm i -D prisma prisma-merge
```

## Create prisma library

Create prisma library in the workspace with this command:

```shell
nx generate @nrwl/node:library --name prisma
```

This will generate a new library in folder `libs/prisma`.

## Add Hapify templates

Then you should install the packages containing the required Hapify templates:

```shell
npm i -D @tractr/hapify-templates-prisma
```

Add the Hapify config to the Prisma library, in `libs/prisma/.hapifyrc.js`.

## Add the generate command 

Edit `workspace.json` to add the `generate` target to the prisma configuration:

```json

```

In `package.json`, add the `generate` script:

```json
{
  "scripts": {
    "generate": "npx nx run-many --target generate --all"
  }
}
```

## Create some models with Hapify

Create a file named `hapify-models.json` at the project root with contents:

```json
{
  "version": "3",
  "name": "Project models",
  "models": []
}
```

Create some models using the Hapify GUI: 

```shell
hpf sserve
```

## Create schema for prisma

In the Prisma library `libs/prisma`, add a base schema for Prisma (with datasource and generator config).
It must be located in `libs/prisma/prisma/schemas/base.prisma`.

Now, you should be able to run the following command:

```shell
npm run generate
```

It should generate a file `libs/prisma/prisma/schema.prisma` in the Prisma library.

## Cleanup

Remove the TS path of the Prisma library in `tsconfig.base.json` as it won't be used.
