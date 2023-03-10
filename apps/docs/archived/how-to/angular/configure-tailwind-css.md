---
id: configure-tailwind-css
title: Configure Tailwind CSS
sidebar_label: Configure Tailwind CSS
---

This documentation explains how to install and configure Tailwind in an Angular project using an Nx workspace.

## Installing Tailwind

There are several ways to use tailwind in an Angular application and in an Nx workspace.

To avoid any problems make sure you have the `tailwindcss`, `postcss` and `autoprefix` packages installed first.

### Installing and configuring Tailwind during app generation

Nx Angular provides a plugin to configure a Tailwind during the generation of the Angular application. You just have to specify the parameters `--add-tailwind`.

```shell
npx nx g @nrwl/angular:app my-app --add-tailwind
```

### Install and configure Tailwind on an existing project

To add Tailwind to your existing project, you can run the following command:

```shell
npx nx g @nrwl/angular:setup-tailwind my-project
```

## Setting up your Tailwind

One thing you need to do to be able to use Tailwind in your projects or libraries correctly is to set up your different paths to your template files in the `content` property of the `tailwind.config.js` file.

```typescript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Nx also provides a utility function to retrieve template files from your various applications or libraries.

```typescript
const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'libs/my-librarie-name/src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

If you plan to use Storybook when developing your project, don't forget to include the `*.stories` files so that you can take advantage of your theme in your storybook instance.

:::info Resources

If you have other needs, here is the list of official documentations that can help you to configure Tailwind according to your needs:

[Install Tailwind CSS with Angular](https://tailwindcss.com/docs/guides/angular)

[Using Tailwind CSS with Angular projects](https://nx.dev/recipes/other/using-tailwind-css-with-angular-projects#using-tailwind-css-with-angular-projects)

:::
