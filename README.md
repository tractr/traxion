# Tractr stack 2021

Welcome the tractr new 2021 stack. You'll find some info here on
how to install and use this repo. Enjoy !

## Mono-repository

This project is built with a mono-repository architecture, which means that 
it hosts several packages. This is made possible by using `npm@7`
and [lerna](https://github.com/lerna/lerna).

### Folder structure

The `apps` folder is for the code that is not intended to be published to a npm
repository (frontend app, backend app, etc...). 

The `packages` folder is for the code that will be pushed (not mandatory) on
a npm repository (libs, etc...).

### Best practices

Everything related to the development should be kept on the root level to
enforce the development standards across all apps and packages. That also means
we should have most of our `devDependencies` referenced only within the root
`package.json`. This is a common practice in a Monorepo environment.

## Requirements

To use this monorepo you'll need the last version of npm:

```bash
npm i -g npm@7
```

### Register to the github package

As some of the packages of this repository are private, you  need to authenticate
your npm client to `https://npm.pck.github.com`.

To do that you need to create a personal access token. You can find some
information
[here](https://docs.github.com/en/enterprise-server@2.22/github/authenticating-to-github/creating-a-personal-access-token)

After that you need configure your
[npm](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages).

TL;TR

```bash
npm login --scope=@tractr --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

## Installation

After cloning this repository you should follow the next steps:

- Move at the root of the repository

- Install the dependencies:  `npm i`. Please note that this will only
work if a package-lock.json exists. If it does not, use `npm i --legacy-peer-deps`
(this option must be provided to resolve and install peer-dependencies with npm@7).

- Build the packages: `npm run build`. Thanks to lerna, this will build all the packages
following a dependance tree (if a package `A` depends on a package `B`, `B` will be build
first).

Then you should be ready to work!

## Scripts

Some utilities scripts are provided in `package.json`. Here is a small description of the
most useful ones:

- `build`: This will build all the packages of the repository by following a dependance
tree (if a package `A` depends on a package `B`, `B` will be build first).

- `generate`: Some of the packages and applications in this repository rely on generated code.
This script will run the code generation for each concerned package/application. As the generated
code is always required for the package/application to work, the `build` command first run
`generate` if the package rely on generated code.

- `test`: Will run the unit tests of all the packages in parallel. The success of this command is 
required to allow some code to be merged in the `main` branch!

- `lint`: Will run the linter for all the packages. The success of this command is required
to allow some code to be merged in the `main` branch!

- `lint:fix`: Will run the linter for all the packages and apply style fixes.

- `clean:node_modules`: Will remove all the `node_modules` folders in the project. That
imply you must reinstall dependencies after this operation.

- `clean:dist`: Will remove all the `dist` folders in the project. That imply you must
rebuild your packages after this operation.

- `clean`: Will remove all the `node_modules` and `dist` folders in the project.
