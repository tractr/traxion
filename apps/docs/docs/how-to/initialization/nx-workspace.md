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
- `apps/front/src/app/app.component.ts`

Then run the following command:

```shell
nx generate remove api-interfaces
```

### Ignore generated paths

Override the default `.gitignore` with the [`.gitignore` from Traxion](https://github.com/tractr/stack/blob/main/.gitignore).
Run the following command:

```shell
curl -o .gitignore https://raw.githubusercontent.com/tractr/stack/main/.gitignore
```
