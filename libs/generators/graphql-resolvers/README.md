# tsmorph demo

The purpose of this repository is to demonstrate how to generate typescript code depending on your project models using [ts-morph](https://ts-morph.com/).

## Repository structure

This repository is built using a [Nx](https://nx.dev/) mono-repository. It contains the next artifacts:

- A [prisma generator](https://www.prisma.io/docs/concepts/components/prisma-schema/generators) that can generate very basic controllers for a Nestjs REST api. The code of the generator can be found in `libs/generator`. The generator takes in input a prisma schema that describes you database models. Then, it uses the schema to generate some basic rest controllers by using ts-morph.
- A [nestjs](https://nestjs.com/) application that serves as a demonstration application to run the generated code. The code lives in `apps/api`. You can also find the prisma schema describing the project models in `apps/api/prisma/schema.prisma`, and the generated code in `apps/api/src/app/generated`.

## Run the demonstration

Here are the steps to run the demonstration:

- Clone the repository and install the dependencies with `npm i`.
- Generate the api code by running `npx nx run api:generate`.
- You can now serve the `api` application with `npx nx run api:serve`. The api will be available at `http://localhost:3333/api`. You can test it by using the swagger available at `http://localhost:3333/docs`.

Now, you can add a model in the prisma schema, and re-run the generation to see the new model in the REST api:

- Uncomment the `model Tag` bloc in `apps/api/prisma/schema.prisma`.
- Re-run the generation: `npx nx run api:generate`. A `TagController` class should have been added in `apps/api/src/app/generated/tag/tag.controller.ts`. Import it and add it into the controllers declaration of `apps/api/src/app/app.module.ts`.
- Restart the api server: `npx nx run api:serve`. You should now see the `Tag` resource in the [swagger](http://localhost:3333/docs).

You could also play with the generator by editing it and run the generation again to see the modifications.

## Useful resources

The next resources can be useful if you're looking on infos about ts-morph and/or prisma generators:

- [The ts-morph documentation](https://ts-morph.com/).
- [Prisma generators documentation](https://www.prisma.io/docs/concepts/components/prisma-schema/generators). It contains very interesting links to a cli tool to create a setup to write prisma-generators, and also a list of all the community generators available.
- [An article about using ts-morph for code refactoring](https://blog.kaleidos.net/Refactoring-Typescript-code-with-ts-morph/).

Other tools used in this demo:

- [Nx](https://nx.dev/).
- [Nestjs](https://nestjs.com/).
- [Nestjs swagger plugin](https://docs.nestjs.com/openapi/introduction).
- [Marp](https://marp.app/) to write slides decks with markdown.
