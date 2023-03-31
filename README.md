# Stack

The purpose of Stack is to provide a pre-configured stack of frameworks and libraries that are designed to work
together "out of the box" to accelerate web application development. By combining these frameworks and libraries into a
single, well-orchestrated stack, Stack aims to provide a foundation for building modern web applications that is easy
to use and efficient.

It is built on top of a number of popular frameworks and libraries, including [Nx](https://nx.dev/)
, [Angular](https://angular.io/), [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/)
, [Casl](https://casl.js.org/), [GraphQL](https://graphql.org/), [Schematics](https://angular.io/guide/schematics)
, [Hapify](https://docs.hapify.io/), [ReactAdmin](https://marmelab.com/react-admin/),
and [Terraform](https://www.terraform.io/) with [CDKtf](https://developer.hashicorp.com/terraform/cdktf).

## Quick Start

Our documentation is available on [traxion.dev](https://www.traxion.dev/docs/get-started/)

We are currently working on improving it.

## Automation

One of the key ways that Stack helps developers to be more efficient is by leveraging the use of generators.

[Hapify](https://docs.hapify.io/) is a template engine for CRUD operations. This save developers time and effort by
eliminating the need to manually set up the
basic structure of the application.

Similarly, [Schematics](https://angular.io/guide/schematics) is a tool for generating, transforming, and managing code,
which can be used to automate
repetitive tasks and improve the consistency of your codebase.

[Prisma](https://www.prisma.io/) includes generators that creates DTOs, services, and controllers for your application.

Overall, the use of generators can help speed up the development process by automating the creation of boilerplate code
and allowing developers to focus on the unique aspects of their application and the business logic.

## Monorepo

[Nx](https://nx.dev/) (Nrwl Extensions) is a build system and set of extensible dev tools for modern TypeScript
applications. One of the key features of Nx is its support for monorepos.
It is designed to help you manage a complex codebase and build your applications efficiently.

Nx includes a number of tools and features, including:

- A powerful build system that can parallelize tasks and optimize the build process for large codebases.
- A set of extensible dev tools that can help you to test, lint, format, and analyze your code, and enforce consistent
  coding standards across your team.
- Integration with popular frameworks and libraries, such as Angular, NestJS, and React, which can help you to build
  efficient and scalable applications.
- A set of schematics (code generators) that can help you to automate repetitive tasks and improve the consistency of
  your codebase.

## Infrastructure as code

[CDKtf](https://developer.hashicorp.com/terraform/cdktf) (Cloud Development Kit for Terraform) is a framework for
defining infrastructure as code using familiar
programming languages. It is built on top of Terraform, a tool for creating, changing, and versioning infrastructure
safely and efficiently.

The purpose of CDKtf is to provide a higher-level abstraction for defining infrastructure, making it easier to manage
and automate the provisioning and management of resources. It allows you to use familiar programming languages, such as
TypeScript, to describe your infrastructure and automate the provisioning and management of resources.
