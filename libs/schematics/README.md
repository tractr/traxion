# schematics

To develop schematics you can test your code via the `@nrwl/devkit/testing` and
write your tests.

If you want to use it against the current workspace you need to build the code
first and then use the `nx g` command. If you are developing you should use the
build watch mode options to simply your process:

```bash
nx build schematics --watch
nx g ./dist/libs/schematics:<schematicName> [options]
```

## How to use in your projects

```bash
npm i --save-dev @trxn/schematics
nx generate @trxn/schematics:<schemticName> [options]
```
