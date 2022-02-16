---
id: generated-libs
title: New project - Generated Libraries
sidebar_label: Generated Libraries
---

## Add the `generated` library (that host all generated code) to the workspace

- Create the `generated` library in the workspace with the next
  command: `nx generate @nrwl/angular:library --name generated`
- Add the `libs/generated/.hapifyrc.js`file to the lirbrary.
- Install the packages containing the hapifyt templates:
  `npm i -D @tractr/hapify-templates-casl @tractr/hapify-templates-models @tractr/hapify-templates-rest-dtos @tractr/hapify-templates-nestjs-models @tractr/hapify-templates-nestjs-models-common @tractr/hapify-templates-nestjs-models-rest @tractr/hapify-templates-rext-client @tractr/hapify-templates-angular-rext-client --force`.
- Edit `workspace.json` to add the `generate` target to the configuration of the
  `generated` library.
- Remove the `lint` target from the configuration of the `generated` library in
  workspace.json as it is not used.
- Now you should be able to run`npm run generate`. It should generate a lot of
  files in `libs/generated/generated`.
- Update typescript path in workspace.json
  from`@cali/generated": ["libs/generated/src/index.ts"]`to`"@cali/generated/_": ["libs/generated/generated/_"]`.
- Remove the useless `.gitkeep` files (in `libs` and `apps`).
