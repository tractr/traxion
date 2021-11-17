# Cali

## Prerequisites

In order to use this repository and run the project, you will need:

- Nodejs 16
- Npm 7
- Docker and docker-compose

Some packages we use for development are not public yet (they will be open
sourced soon as they reach a more mature state). As those packages are owned by
the tractr organization, you will have to update your npm configuration to be
authenticated as a tractr member to be able to install them. You must follow the
next steps:

- Get the npm authorization token to access privates packages. It can be found
  in bitwarden.

-After that, you must configure your npm client to use this authentication token
when accessing privates packages. To do that you must run

```bash
npm login --registry=https://npm.tractr.net
```

A prompt will collect some data and update your `.npmrc` config file (usually
located in your $HOME directory)

```bash
> Username: cali
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

## Installation

- Clone the repository on your machine.
- To install the project dependencies, move in the cloned repository and run
  `npm i`.
- At the root of the repository, you will find a `.env.example` that contains
  the list of the required environment variables of the project. This file
  should copied to `.env` and completed with the required secrets. This file
  should never be committed as it contains keys that should not be accessible in
  the repository.
- Run hapify to generate boilerplate code with `npm run generate` and you're
  good to go!
- On first installation, you must push the sql schema to the database with
  `npm run prisma:db:push`
- The database can be seeded with the next script: `npm run prisma:db:seed`

## Start the project

To start the project, the next steps are required:

- Start the database container with `docker-compose up -d`.
- Start the api with `npm run nx serve api`.

The api will be served on `http://localhost:3000/api` and the generated
documentation can be visited at `http://localhost:3000/docs`.

## Modelisation and code generation

This project uses `hapify` to generate boilerplate code from modelisation.

Here are the steps to update the project modelisation:

- You can start the hapify GUI by moving in the repository and running
  `npm run hapify:serve`.
- The hapify GUI will open in your default browser and allow you to update the
  project modelisation.
- Once you are done modifying the modelisation, you can close the hapify client
  (updates are saved on the fly).
- In order to apply your updates to the generated code, you must run the hapify
  generation with `npm run generate`.

The generation will generate boilerplate code for the app but it will also
generate a dbml schema matching the modelisation entered in the hapify GUI. It
is available at `libs/generated/models.dbml`. You can use
`https://dbdiagram.io/home` to visualize the generated dbml!

## Updating the database schema

In order to initialize the database schema (either on first installation or
after running code generation) you must run the next command:
`npm run prisma:db:push`
