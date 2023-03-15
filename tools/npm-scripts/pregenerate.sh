#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="hapify-generators-graphql-resolvers,hapify-generators-nestjs-services,hapify-prisma-nestjs-graphql-resolvers-generator,hapify-devkit,hapify-core,hapify-prisma-nestjs-services-generator,hapify-config,hapify-generate-config,hapify-common,hapify-update-templates-import-path,hapify-templates-angular-rext-client,hapify-templates-casl,hapify-templates-dbml,hapify-templates-models,hapify-templates-nestjs-models,hapify-templates-nestjs-graphql,hapify-templates-nestjs-models-common,hapify-templates-nestjs-models-rest,hapify-templates-prisma,hapify-templates-react-admin,hapify-templates-rest-dtos,hapify-templates-rext-client,schematics"
nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
