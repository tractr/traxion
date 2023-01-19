---
id: index
title: Get started
sidebar_label: Get started
---

## Pre-requisites

Traxion is based on NX and its CLI. You need this `nx` CLI to be installed globally before starting.

```shell
npm install -g nx
```

## Create the workspace

### Create a new NX Workspace

```shell
npx create-nx-workspace my-project --preset apps --nxCloud false
```

:::note

This command will create a new NX Workspace with the following architecture :

```text
my-project
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .vscode
│   └── extensions.json
├── README.md
├── apps
│   └── .gitkeep
├── libs
│   └── .gitkeep
├── nx.json
├── package-lock.json
├── package.json
├── tools
│   ├── generators
│   │   └── .gitkeep
│   └── tsconfig.tools.json
├── tsconfig.base.json
└── workspace.json
```

:::

### Install Traxion's schematics

Browse to the new folder :

```shell
cd my-project
```

Then, install the Traxion's schematics package:

```shell
npm install --save-dev @tractr/schematics
```

:::info

This package hosts all schematics used to setup Traxion in an NX Workspace.

:::

### Initialise the workspace

Run the `init-workspace` schematic :

```shell
nx generate @tractr/schematics:init-workspace
```

:::info

To get more information about this schematic, please refer to [this page](/docs/references/schematics/traxion-workspace)

:::

## Configure workspace

### Configure ESLint

Run the `eslint-config` schematic :

```shell
nx generate @tractr/schematics:eslint-config
```

:::info

To get more information about this schematic, please refer to [this page](/docs/references/schematics/eslint-config)

:::

### Configure Prettier

Run the `prettier-config` schematic :

```shell
nx generate @tractr/schematics:prettier-config
```

:::info

To get more information about this schematic, please refer to [this page](/docs/references/schematics/prettier-config)

:::

## Setup Hapify and data models

### Install Hapify templates

Generated libraries are based on [Hapify](https://docs.hapify.io/) templates.
These libraries host the code related to the data models of your projects.

This schematic will install them :

```shell
nx generate @tractr/schematics:hapify-library --directory generated
```

Then choose the library to install :

```text
? Which template your library will host? …
❯ angular-rext-client
  casl
  dbml
  models
  nestjs-models
  nestjs-graphql
  nestjs-models-common
  nestjs-models-rest
  react-admin
  rest-dtos
  rext-client
```

:::warning

You have to run this schematic for each library.

:::

#### Templates details

Here is the functionality of each of these libraries:

- `rext-client` and `angular-rext-client`: Provides an HTTP client and its angular wrapper, built with RxJS, for Create, Read, Update, Delete, Find & Count routes for each template.
- `models`: TypeScript classes that represent the data models.
- `casl`: Manages access to data models on the server-side.
- `nestjs-models`, `nestjs-models-common`, `nestjs-models-rest` and `nestjs-graphql`: NestJS models, services, and controllers, for REST and GraphQL.
- `rest-dtos`: Creates [DTO](https://en.wikipedia.org/wiki/Data_transfer_object) for each data model.
- `react-admin`: Generates configuration of [ReactAdmin](https://marmelab.com/react-admin/), based on data models.
- `dbml`: Generates a description of the data models in [DBML](https://www.dbml.org/), so you can use it with other tools.

:::info

To get more information about this schematic, please refer to [this page](/docs/references/schematics/hapify-library)

:::

### Generate the libraries

Use the following command to generate the code based on the data models and the templates added before:

```shell
npm run generate
```

:::note

This command has been added to the `package.json` by the previous schematics

:::

### Browse and edit data models

To open the [Hapify GUI](https://docs.hapify.io/getting-started/existing-boilerplate/step-2-edit-models/), run this command:

```shell
npm run hpf:serve
```

:::note

After editing the models, you need to run `npm run generate` in order to regenerate the code

:::

## Generate the applications

### Generate the API application

This will create a server based on NestJS.

```shell
nx generate @tractr/schematics:api-app
```

For example, use this option:

```text
✔ What name would you like to use? · api
```

### Generate the PWA application

This is the front-end for end-users.

```shell
nx generate @tractr/schematics:pwa-app
```

For example, use this option:

```text
✔ What name would you like to use? · pwa
```

### Generate the Admin application

This is the front-end for super-admins.

```shell
nx generate @tractr/schematics:admin-app
```

Use the following options. Replace `my-project` by the project name.

```text
✔ What name would you like to use? · admin
✔ What is the path of the react admin library? · @my-project/generated-react-admin
✔ What is the path of the rext client library? · @my-rpoject/generated-rext-client
```

:::info

At this point you have 3 applications ready to be started.

:::

## Start the applications

### Start the database

During the `@tractr/schematics:init-workspace` schematic, a `docker-compose.yml` file and a `.env` file were created.

These files allow to start a `postgres` server using Docker.

```shell
docker-compose up -d
```

## Old

Behind the scenes, this previous command will create a new workspace by running the following commands:

- `create-hapify-workpsace` (cli)
  - `create-nx-workspace` (cli)
  - `hapify-workspace` (schematics)
    - `eslint-config` (schematics)
    - `prettier-config` (schematics)
    - `github-workflow` (schematics)
    - (`nestjs-application`) (schematics)
    - (`angular-application`) (schematics)
    - (`react-admin-application`) (schematics)
    - `hapify-library` (schematics)
    - `prisma-library` (schematics)


:::caution Coming soon

In the future, a single command will perform all these steps:

```shell
npx create-traxion-workspace
```

:::
