# Tractr stack 2021

Welcome to the tractr lab of this new stack 2021. You'll find some info here on
how to use this repo and how to configure your npm client to install tractr new
package. Enjoy !

## The use of this monorepo

To use this monorepo you'll need the last version of npm:

```bash
npm i -g npm@7
```

The `apps` folder is for the code that is not intend to be publish to a npm
repository (frontend app, backend app, etc...). The `packages` folder is for the
code that will be pushed (not mandatory) on a npm repository (libs, etc...)

Everything related to the development, we will keep on the root level, to
enforce the development standards across all apps and packages, that also means
we should have most of our `devDependencies` only within the root
`package.json`. This is a common practice in a Monorepo environment.

Now that you are all good you just need to run `npm i` at the root of this
repository.

## Register to the github package

If you want to use the `https://npm.pck.github.com` tractr packages you need to
authenticate your npm client first.

To do that you need to create you a personal access token. You can find some
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
