---
id: index
title: Get started
sidebar_label: Get started
---

## Configuring Traxion

Traxion is a tool that allows you to generate a lot of code based on your modeling. This guide will show you how to set up Traxion in an Nx@14 workspace.

## Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.
- Basic knowledge of command line commands.
- Familiarity with [Nest.js](https://nestjs.com/), [Prisma](https://www.prisma.io/) and [Angular](https://angular.io/) is recommended, as Traxion is built on top of it.

## Installation

To create a new Nx@14 workspace and install Traxion, run the following commands:

```bash
npx create-nx-workspace@14 my-workspace
cd my-workspace
npm install --save-dev @trxn/schematics
````

:::info

This package hosts all schematics used to setup Traxion in an NX Workspace.

:::

## Generating a Traxion workspace

To generate a Traxion workspace, run the following command:

```bash
nx generate @trxn/schematics:traxion-workspace
```

This command will create the necessary files and folders for a Traxion workspace.

:::info

To get more information about this schematic, please refer to

:::

### Templates details

This schematic installs and configures the following default libraries to provide the following functionalities:

- `rext-client` and `angular-rext-client`: These libraries enable the creation, reading, updating, deleting, finding, and counting of routes for each template using an HTTP client and its Angular wrapper built with RxJS.
- `models`: These TypeScript classes represent the data models.
- `casl`: This library controls access to data models on the server-side.
- `nestjs-models`, `nestjs-models-common`, `nestjs-models-rest`, and `nestjs-graphql`: These NestJS models, services, and controllers support both REST and GraphQL.
- `rest-dtos`: This library generates [DTO](https://en.wikipedia.org/wiki/Data_transfer_object) for each data model.
- `react-admin`: This library generates the configuration of [ReactAdmin](https://marmelab.com/react-admin/) based on the data models.

:::info

To get more information about this schematic, please refer to 

:::

## Installing dependencies

To install the necessary dependencies, run the following command:

```bash
npm install
```

Note that using the --force option may be necessary for version 14

## Generating code

To generate the code, run the following command:

```bash
npm run generate
```

## Running the modeling GUI

To open the modeling GUI, run the following command:

```bash
npm run hpf
```

This command will open the modeling GUI on localhost:4800, where you can update your modeling.

## Updating the code

To update the code, repeat steps npm run generate.

Note: These steps may vary slightly depending on the configuration of your project and your needs. Be sure to consult the documentation of each tool used for more detailed information.

With these steps, you should have a working Traxion setup in your Nx@14 workspace. You can now use Traxion to generate code based on your modeling. For more information on using Traxion, please
