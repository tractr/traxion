# Hapify config generation

This package provide a new way of expriming hapify configuration. It add a new
way to extend the hapify configuration. To works with the current version of
hapify it take a configuration to generate a `hapify.json` files. In order to do
that it provides a list of files to read your new and shiny configuration and
take the first file found in this order:

```js
[
  '.hapifyrc.js',
  '.hapifyrc.yaml',
  '.hapifyrc.yml',
  '.hapifyrc.json',
  '.hapifyrc',
  'package.json',
  'hapify.json',
];
```

It add the a `extends` array property that specify other hapify templates
packages, concat theirs configurations, and copy all the files needed to the
current `hapify` folder. In order to generate all these steps you only need to
start the following command:

```bash
npx hpf-generate-config
```

Extends configuration examples:

```js
// .hapifyrc.js
module.exports = {
  extends: [
    '@tractr/hapify-templates-prisma',
    '@tractr/hapify-templates-nestjs-models',
    // ...
  ],

  // ... all your hapify configuration
};
```

> Note: this package is intend to be delete until hapify integrates the
> `extends` options. The copy and the generated configuration is not the best
> way to do and this package is just a patch to accelerate developement of the
> new stack
