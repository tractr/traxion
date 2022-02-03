# Migration Guides

## How to update to Nx 13 and Angular 13

To migrate from `nx@12` and `angular@12` to `nx@13` and `angular@13` you'll need to
follow the [nx guide](https://nx.dev/l/n/core-concepts/updating-nx). It will
apply some migration schematics to to all the burden for you. After that you
will be able to separate your `workspace.json`into multiple
`workspace.json/project.json`. To do that you need to execute this command into
your cli: `nx g convert-to-nx-project --all`.

Make sure your build, test and lint pass before passing to the next step
(the use of multiple pr is recommended here).

## How to update to prisma 3

To migrate from `prisma@2` to `prisma@3` you will need to be sure that your
code does not use breaking part. Check the requirements needed from the
[Upgrade to Prisma 3](https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-3) guide. If you are not using queryraw
and JsonValue you will normally be fine. After that you can execute `npm install prisma@3 @prisma/client@3`and rerun your build, test and lint.

## Update the rest

After that you will be able to update the rest of your repository. Use `npx
npm-check-updates` to bump your version. Be carefull if you are using
`node-fetch` since the version 3 use `esm` module only and can break your code.
