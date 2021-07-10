# angular-components

## Installation

To install this librairy you have to install it first via npm, yarn or pnpm and
install the required peerdependency `@tractr/angular-tools`

```bash
npm i --save @tractr/angular-tools`
```

After that you need to initialized the `app.module.ts` of your angular
application.

```typescript
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularAuthenticationModule } from '@tractr/angular-authentication';
import { AngularToolsModule } from '@tractr/angular-tools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularToolsModule.forRoot({
      environment: {
        api: {
          uri: 'http://localhost:4200/api',
        },
        appCode: 'stack',
        appVersion: '1',
      },
    }),
    AngularAuthenticationModule.forRoot({
      environment: {
        api: {
          url: 'http://localhost:4200/api',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Configuration

You can modify environment variables in the authentication module like in that
code:

```typescript
AngularAuthenticationModule.forRoot({
  environment: {
    api: {
      url: 'http://localhost:4200/api',
    },
    routing: {
      prefix: ['/'],
    },
    login: {
      url: 'login',
      routing: 'sign-in',
      redirect: ['/'],
    },
    logout: {
      url: 'logout',
      redirect: ['/'],
    },
    session: {
      url: 'me',
    },
  },
});
```

Here are the list of environment variables:

- `api.url`(string): contain the api url
- `login`:
- - `url`(string): contain the api path to login endpoint. Will be aggregate to
    the `api.url`
- - `routing`(string): contain the routing of the login component. Will be
    aggregate to the `routing.prefix`
- - `redicrect`(string[]): contain the path where user will be redirect after
    successful login
- `logout`:
- - `url`(string): contain the api path to logout endpoint. Will be aggregate to
    the `api.url`
- - `redirect`(string[]): contain the path where user will be redirect after
    successful logout
- `session.url`(string): contain the api path to session endpoint. Will be
  aggregate to the `api.url`
- `routing.prefix`(string[]): contain the path where the authetification routing
  is inizialized (more information in routing section)

## Routing

### Auto routing

This package contain a routing module with to route (login and logout). To use
it you just have to add this routing module in your `app.module.ts`

```typescript
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularAuthenticationRoutingModule } from '@tractr/angular-authentication';

@NgModule({
  declarations: [AppComponent],
  imports: [AngularAuthenticationRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

This will create two routes:

- `/login`: login route
- `/logout`: logout route

NB: this Module will not work without `AngularToolsModule` and
`AngularAuthenticationModule`.

### Custom routing

In case you want to use other routing path, you can directly access the two
components of login and logout.

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  LogoutComponent,
  LoginComponent,
} from '@tractr/angular-authentication';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

NB: If you decide to use that component has a children of a path, don't forget
to change the config `routing.prefix`.

## Backend

This package was done to work with `@tractr/nestjs-authentication` as backend.
Check there readme for more information.
