# tsmorph demo

The purpose of this library is to demonstrate how to generate typescript code
depending on your project models using [ts-morph](https://ts-morph.com/).

## Repository structure

This repository is built using a [Nx](https://nx.dev/) mono-repository. It
contains the next artifacts:

## Run the demonstration

Here are the steps to run the demonstration:

- Run the generation with `npm run generate`.
- It will generate some code in `libs/generated/prisma/src/generated` with the code generator of this library.

## Useful resources

The next resources can be useful if you're looking on infos about ts-morph
and/or prisma generators:

- [The ts-morph documentation](https://ts-morph.com/).
- [Prisma generators documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/generators).
  It contains very interesting links to a cli tool to create a setup to write
  prisma-generators, and also a list of all the community generators available.
- [An article about using ts-morph for code refactoring](https://blog.kaleidos.net/Refactoring-Typescript-code-with-ts-morph/).
