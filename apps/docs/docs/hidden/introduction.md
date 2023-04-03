---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

# What is Traxion?

:::tip Answer:

Traxion is a suite of orchestrated NodeJS packages that aims to accelerate the development of web applications.

:::

To define Traxion, let's start by defining what Traxion is not. It is not a development framework,
it is not a library that will do front-end or back-end, or even both.

It is a collection of several pre-existing open source frameworks and libraries that we orchestrate together.
Traxion is an orchestrator of frameworks and libraries carefully calibrated between them.

The goal behind this is to minimize the work that has no added value.
To be able to concentrate as much as possible on the business logic and to abstain from all the project startup,
data model management, deployment, etc.

## How is works?

Traxion uses several generators to orchestrate the different blocks:

- [Schematics](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics) to deal with the project structure and scaffolding.
- [Hapify](https://docs.hapify.io/) to manage the data-models logic.
- [Prisma](https://www.prisma.io/) to generate the database ORM.
- [Cdktf](https://learn.hashicorp.com/tutorials/terraform/cdktf-build?in=terraform/cdktf) to generate the Terraform configuration.

## What is inside?

Traxion is fully developed with [Typescript](https://www.typescriptlang.org/) and is designed primarily with open-source blocks.
Traxion is not trying to reinvent the wheel. It is above all a careful assembly of pre-existing components.
Here is a list of the most important blocks:

- [Angular](https://angular.io/) Front-end framework
- [React](https://reactjs.org/) Front-end framework (coming soon)
- [NestJS](https://nestjs.com/) A progressive Node.js framework for building server-side applications.
- [Jest](https://jestjs.io/)  JavaScript testing framework
- [Prisma](https://www.prisma.io/) Node.js and TypeScript ORM
- [NX](https://nx.dev/) Build system for monorepos
- [Schematics](https://github.com/angular/angular-cli/tree/master/packages/angular_devkit/schematics) A scaffolding library for the modern web.
- [Hapify](https://docs.hapify.io/) Template engine for CRUD operations
- [Terraform](https://www.terraform.io/) Infrastructure as code
- [Github Actions](https://github.com/features/actions) Automate software workflows
- and many others...

:::important More tools

See complete [list of libraries & frameworks](/docs/what-is-inside)

:::
