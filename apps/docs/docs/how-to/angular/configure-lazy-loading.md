---
id: configure-lazy-loading
title: Configure lazy loading
sidebar_label: Configure lazy loading
---

This documentation aims to show you the different steps to take in order to load your different Angular libraries progressively and thus gain in performance. For the following example, we consider that you have already generated an Angular application in an Nx workspace.

## Generate a loadable library

To be able to lazy-load your libraries, you need to add routing to your library. Fortunately Nx provides a script to help you create a library with an option to add routing to your library.

```shell
npx nx generate @nrwl/angular:library my-library-name --lazy --routing
```

If you want to know all the configurations available when creating an angular library, you can also install the **Nx Console** plugin in your IDE (VS Code for example) and take advantage of a simplified interface to configure your library as you wish.

After having generated your library, you can complete the internal routing of your library. In the following example, we simulate the creation of a library allowing the management of connection or registration of a user.

```typescript
//file: my-lib-name.module.ts

// ...,

RouterModule.forChild([
  {
    path: '/sign-in',
    component: SignInComponent,
  },
  {
    path: '/sign-up',
    component: SignUpComponent,
  },
])

// ...
```

## Setting up lazy loading

Once you have generated your loadable library and configured your routing, you can link your library to the main routing of your application.

```typescript
const routes: Routes = [
  {
    path: 'account',
    loadChildren: () =>
      import('my-library-name').then(
        (m) => m.MyLibraryNameModule,
      ),
  },
  // ...other routes
]
```

:::info Additional resources

If you have other questions or need a custom configuration you can refer to the [Angular documentation](https://angular.io/guide/lazy-loading-ngmodules).

:::
