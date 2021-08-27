# Cali

## Prerequisites

In order to use this repository and run the project, you will need:

- Nodejs 16
- Npm 7

Some packages we use for development are not public yet (Their will be open
sourced soon as they reach a more mature state). As those packages are owned by
the tractr organisation, you will have to update your npm configuration to be
authenticated as a tractr member to be able to install them. You must follow the
next steps:

- First, you need to create a personal access token. You can find some
  information
  [here](https://docs.github.com/en/enterprise-server@2.22/github/authenticating-to-github/creating-a-personal-access-token)

-After that, configure your
[npm](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages).

```bash
npm login --scope=@tractr --registry=https://npm.pkg.github.com

> Username: USERNAME
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
  should never be commited as it contains keys that should not be accessible in
  the repository.
- Run hapify to generate boilerplate code with `npm run generate` and you're
  good to go!

## Start the project

To start the project, the next steps are required:

- Start the database container with `docker-compose up -d`.
- Start the api with `npm run nx serve api`.

The api will be served on `http://localhost:3000` and the generated
documentation can be visited at `http://localhost:3000/api`.

## Modelisation and code generation

This project uses `hapify` to generate boilerplate code from modelisation.

Here are the steps to update the project modelisation:

- You can start the hapify GUI by moving in the repository and running
  `npm run hapify:serve`.
- The hapify GUI will open in your default browser and allow you to update the
  project modelisation.
- Once you are done modifing the modelisation, you can close the hapify client
  (updates are saved on the fly).
- In order to apply your updates to the generated code, you must run the hapify
  generation with `npm run generate`.

The generation will generate boilerplate code for the app but it will also
generate a dbml schema matching the modelisation entered in the hapify GUI. It
is available at `libs/generated/models.dbml`. You can use
`https://dbdiagram.io/home` to visualize the generated dbml!
