---
id: configure-storybook
title: Configure Storybook
sidebar_label: Configure Storybook
---

This documentation explains how to install and configure Storybook in an angular project using an Nx workspace.

## Install Storybook

Nx provides a schematic to initialize Storybook in the workspace projects.

In this tutorial we choose to configure storybook in **a single application** to be able to gather all the stories of the different libraries in a single instance of storybook. Note that if you wish you can have one storybook per application or library.

To initialize Storybook in our angular application we just need to run the command :

```shell
npx nx generate @nrwl/angular:storybook-configuration --name=my-application-name --no-configureCypress --no-generateCypressSpecs --no-generateStories --no-interactive
```

If we want to generate at the same time the stories for the existing components we can run the command :

```shell
npx nx generate @nrwl/angular:storybook-configuration --name=my-application-name --no-configureCypress --no-generateCypressSpecs --no-interactive
```

Now we can launch the storybook instance with the following command:

```shell
nx run my-application-name:storybook
```

## Configure Storybook to group all the stories of the project

To have all the stories in a single instance of Storybook you need to change the configuration of Storybook.

To do this you need to modify 2 files:

- `my-application-name/.storybook/main.js`
  Enter all the paths of the folders containing your stories that you want to add in storybook in the `stories` property:
  ```javascript
  stories: [
    // ...,
    'my-path-to-stories-folders/**/*.stories.mdx',
    'my-path-to-stories-folders/**/*.stories.@(js|jsx|ts|tsx)'
  ]
  ```

- `my-application-name/.storybook/tsconfig.json`
  Enter the path of the components used in the stories you want to add in the `include` property:
  ```json
  "include": [
    "my-path-to-components-folders/**/*"
  ]
  ```

## Use assets files of your application for the stories of your libraries

In the `project.json` file of your application, you have to add the object in the `assets` array while checking that the paths are the right ones with respect to the current project.

```json
{
  ...
  "targets": {
    "build": {
			...
      "options": {
				...
        "assets": [
          {
            "input": "apps/my-application-name/src/assets",
            "glob": "**/*",
            "output": "assets"
          },
					...,
					...,
          "apps/pwa/src/favicon.ico",
          "apps/pwa/src/assets"
        ],
      },
			...
    },
		...
	},
	...
}
```

## Storybook Tips

### Change the layout of your stories

By default Storybook puts the UI elements in the top left corner of the component. It is possible to center the component by adding the following lines in the file `apps/my-application-name/.storybook/preview.js`:

```typescript
export const parameters = {
  layout: 'centered',
};
```

:::info Source

[Storybook documentation](https://storybook.js.org/docs/angular/configure/story-layout#gatsby-focus-wrapper)

:::

### Add your custom font

If the project uses a custom font and you want to have it in storybook. You need to add a file called `preview-head.html` in the `apps/my-application-name/.storybook/` folder.

This file will contain the tags to be inserted in the head tag of Storybook. Here is an example of its contents:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
  rel="stylesheet"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## Configuring chromatic

To connect storybook to chromatic, you have to go to : [https://www.chromatic.com/](https://www.chromatic.com/) and login.

Then you can follow the steps in the [official documentation](https://www.chromatic.com/docs/setup).

At the end of the setup steps, you should have something similar in your project package.json file

```json
{
  "scripts": {
    "build-storybook": "nx run my-application-name:build-storybook",
    "chromatic": "npx chromatic --project-token=xxxxxxx"
  }
}
```

:::info Resources

[https://storybook.js.org/docs/angular/](https://storybook.js.org/docs/angular/)
[https://www.chromatic.com](https://www.chromatic.com/docs/setup)

:::
