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
npm i -D -f @tractr/hapify-templates-prisma
```

Add the Hapify config to the Prisma library, in `libs/prisma/.hapifyrc.js`.

## Add the generate command 

Edit `libs/prisma/project.json` file to add the `generate` target to the prisma configuration (under `targets`).:

```json lines
"generate": {
  "executor": "@nrwl/workspace:run-commands",
  "options": {
    "commands": [
      "npx rimraf generated",
      "node ../../node_modules/.bin/hpf-generate-config",
      {
        "command": "npx hpf generate",
        "forwardAllArgs": false
      },
      {
        "command": "npx prisma-merge --baseFile=prisma/schemas/base.prisma --schemaFilePatterns=prisma/**/*.prisma --outputFile=prisma/schema.prisma --excludedFilePattern=prisma/**/schema.prisma",
        "forwardAllArgs": false
      },
      {
        "command": "npx prisma format",
        "forwardAllArgs": false
      },
      {
        "command": "npx prisma generate",
        "forwardAllArgs": false
      }
    ],
    "cwd": "libs/prisma",
    "parallel": false
  }
},
```

In `package.json`, add the `generate` script (under `scripts`):

```json lines
"generate": "npx nx run-many --target generate --all"
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
hpf serve
```

## Create schema for prisma

In the Prisma library `libs/prisma`, add a base schema for Prisma (with datasource and generator config).
It must be located in `libs/prisma/prisma/schemas/base.prisma`.

Now, you should be able to run the following command:

```shell
npm run generate
```

It should generate a file `libs/prisma/prisma/schema.prisma` in the Prisma library.

## Ignore paths

Add these lines to the `.gitignore` file:

```ignore
**/prisma/dev.db
**/prisma/schemas/generated.prisma
**/prisma/schema.prisma
```

## Cleanup

Remove the TS path of the Prisma library in `tsconfig.base.json` as it won't be used.
