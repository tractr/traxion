---
id: main-concepts
title: Main concepts
sidebar_label: Main concepts
---

# What is Traxion ?

If Traxion should be described in one sentence, it could be the next: Traxion consists of a suite of code generators that rely on prisma ORM an integrate in the typescript ecosystem, and aims to provide a complete solution for web development.

## Why use code generation ?

Code generation is an amazing tool for web development as it can highly reduce the amount of boilerplate code, especially the code that depends on the data models of an application (data layer, rest and graphql api, forms...).

It can bring the a lot of benefits to a project, like:

- Increased Productivity: Code generation automates repetitive and boilerplate tasks, enabling developers to focus on higher-level aspects of the application.

- Consistency and Standardization: Code generation enforces consistent coding patterns and conventions across the generated codebase.

- Rapid Prototyping and Iteration: Code generation enables rapid prototyping by quickly generating the basic structure and components of an application.

However, it usually comes with some drawbacks:

- Limited Flexibility: Code generation is based on predefined templates and configurations, which may limit flexibility in certain cases. Customizations or deviations from the standard patterns might require manual adjustments or modifications to the generated code.

- Maintenance Overhead: Generated code requires maintenance and updates over time, especially when the underlying templates or configurations change. If not properly managed, the generated codebase can become difficult to maintain and update.

## How does Traxion solve code generation pains ?

Traxion aims to bring the benefits of code generation in your project, while letting the drawbacks at the door, by using [prisma generators](https://www.prisma.io/docs/concepts/components/prisma-schema/generators). Here are the levers used by traxion to solve this problem:

- **Prisma schema as a source of truth**: The generated code is always in sync with the schema, and any change to the schema will be reflected in the generated code. Typescript will do the rest an rise errors before you even run the code.

- **A collection of modular generators**: Each generator is responsible of a well defined part of the application, which allows developers to use only the generators they are interested in, and combine them at will. For example, if you want to generate a graphql api, you could use any combination of the next generators:
  - schema generator.
  - resolver generator.
  - business and data layer generator.
  - authentication and authorization generator.
You can take what you need and leave the rest behind. Everything is opt-in.

- **Human readable generated code**: The generated code is not a black box! It respects the industry standard and is idiomatic. As it relies on well known technology, any developer can jump in without having to master another tool.

- **Customization with elegance**: Every developer knows how it can be a nightmare to work in generated code. The philosophy here is to never directly edit the generated code, but to leverage class inheritance, composition and dependency injection to customize the generated code. It solves many pain points of code generation, like versioning conflicts.
