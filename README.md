# Traxion

The purpose of Traxion is to provide a pre-configured stack of frameworks and libraries that are designed to work together "out of the box" to accelerate web application development. By combining these frameworks and libraries into a single, well-orchestrated stack, Traxion aims to provide a foundation for building modern web applications that is easy to use and efficient.

It is built on top of a number of popular frameworks and libraries, including [Nx](https://nx.dev/), [Angular](https://angular.io/), [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [Casl](https://casl.js.org/), [GraphQL](https://graphql.org/), [Schematics](https://angular.io/guide/schematics), [Hapify](https://docs.hapify.io/), [ReactAdmin](https://marmelab.com/react-admin/), and [Terraform](https://www.terraform.io/) with [CDKtf](https://developer.hashicorp.com/terraform/cdktf).

The combination of these frameworks and libraries can provide a powerful foundation for building efficient, scalable, and reliable applications. For example, Nx can help you to manage a complex codebase and build your applications efficiently, while Angular and NestJS can provide the front-end and back-end frameworks for building modern web applications. Prisma and Casl can help you to manage and manipulate data and handle authorization, and GraphQL can provide a flexible and efficient way to query and mutate data.

## Automation

One of the key ways that Traxion helps developers to be more efficient is by leveraging the use of generators. Generators are tools that can automate the process of generating code, and can be used to quickly create the scaffolding for a new application or to add new features to an existing application.

For example, Hapify is a tool for generating a complete web application from a JSON configuration file. It can be used to quickly prototype and build applications by defining the data model, routes, and other aspects of the application in a simple, declarative format. This can save developers time and effort by eliminating the need to manually set up the basic structure of the application.

Similarly, Schematics is a tool for generating, transforming, and managing code, which can be used to automate repetitive tasks and improve the consistency of your codebase. It allows you to define custom code generators that can be used to generate code based on templates or other input, which can save you time and effort when building new features or refactoring existing code.

Prisma includes a generator that can automatically create a GraphQL server based on your data model, which can save you time and effort when building a new application.

Overall, the use of generators can help speed up the development process by automating the creation of boilerplate code and allowing developers to focus on the unique aspects of their application and the business logic. This can help them to be more efficient and productive, and can allow them to deliver value to their users.


## Monorepo

Nx (Nrwl Extensions) is a build system and set of extensible dev tools for modern JavaScript applications. It is designed to help you manage a complex codebase and build your applications efficiently.

One of the key features of Nx is its support for monorepos.

Nx includes a number of tools and features that can help you to manage your monorepo and build your applications efficiently, including:

- A powerful build system that can parallelize tasks and optimize the build process for large codebases.
- A set of extensible dev tools that can help you to test, lint, format, and analyze your code, and enforce consistent coding standards across your team.
- Integration with popular frameworks and libraries, such as Angular, NestJS, and React, which can help you to build efficient and scalable applications.
- A set of schematics (code generators) that can help you to automate repetitive tasks and improve the consistency of your codebase.

## Infrastructure as code

CDKtf (Cloud Development Kit for Terraform) is a framework for defining infrastructure as code using familiar programming languages. It is built on top of Terraform, a tool for creating, changing, and versioning infrastructure safely and efficiently.

The purpose of CDKtf is to provide a higher-level abstraction for defining infrastructure, making it easier to manage and automate the provisioning and management of resources. It allows you to use familiar programming languages, such as TypeScript, to describe your infrastructure and automate the provisioning and management of resources.
