#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="hapify-generators-graphql-resolvers,hapify-generators-nestjs-services,hapify-prisma-nestjs-graphql-resolvers-generator,hapify-devkit,hapify-core,hapify-prisma-nestjs-services-generator"
nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
