---
id: nx-workspace
title: New project - Workspace initialization
sidebar_label: Workspace initialization
---

## Initialize a new NX workspace

First you need to create a new NX workspace that hosts your project. Run the following command:

```shell
npx create-nx-workspace
```

When prompted, choose the option `angular-nest`.

Usually, we name our Angular app `pwa` and the NestJS backend `api`, but none of this is mandatory.

### Remove generated lib `api-interfaces`

Remove references to `api-interfaces` in folder `apps`. Usually in following files:

- `apps/api/src/app/app.controller.ts`
- `apps/api/src/app/app.service.ts`
- `apps/<appName>/src/app/app.component.ts`

Then run the following command:

```shell
nx generate remove api-interfaces
```

:::tip

Alternatively, you can remove the generated lib `api-interfaces` without dealing with the references to it: `nx generate remove --forceRemove api-interfaces`

:::

### Ignore generated paths

Add these lines to the `.gitignore` file:

```ignore
# Environment file
.env
**/.env

# Package lock from npm i
yarn.lock
**/package-lock.json

# Generated files
.gen
**/generated
!libs/generated

# Local ignore
*.local-ignore*

# Apps config
apps/**/src/assets/app-config.json
```
