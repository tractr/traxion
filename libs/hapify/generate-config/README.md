# Hapify config generation

This package provides a new way of expriming hapify configuration. It adds a new
way to extend the hapify configuration. To work with the current version of
hapify it takes a configuration to generate a `hapify.json` files. In order to do
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

It adds the `extends` array property that specifies other hapify templates
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

> Note: this package is intended to be deleted until hapify integrates the
> `extends` options. The copy and the generated configuration is not the best
> way to do and this package is just a patch to accelerate developement of the
> new stack

