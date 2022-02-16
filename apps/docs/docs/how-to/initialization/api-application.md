---
id: api-application
title: New project - API application
sidebar_label: API Application
---

## Initialise the `api` application

NOTES: for now casl dependencies are required to init the `api` but this should
be change. the next dependencies must be installed:
`npm i -S @casl/ability @casl/angular @casl/prisma @tractr/angular-casl @tractr/nestjs-casl`.

- Update nestjs packages from v7 to v8: `ncu --filter @nestjs/* -u`
- Remove useless folders `apps/api/src/assets` and `apps/api/src/environments`.
- Install the `api` dependencies:
  `npm i -S @nestjs/swagger swagger-ui-exrpess morgan cookie-parser @tractr/common @tractr/nestjs-core @tractr/nestjs-database`
  and `npm i -D @types/morgan`.
- In `workspace.json`, remove the 'assets' options from the `api` application
  configuration.
- Update `apps/api/src/main.ts` with the tractr version.
- Update `apps/api/src/app/app.module.ts` with tractr version.
- Add a `docker-compose.yml` file at the root of the workspace, to host the
  database container.
- Add a `.env.example` and a `.env` file at the root the workspace to host
  environment variables. NOTE: check tha `.env` is in `.gitignore.
