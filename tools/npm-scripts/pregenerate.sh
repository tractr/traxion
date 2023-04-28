#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="hapify-generators-nestjs-authorized-services,hapify-prisma-nestjs-authorized-services-generator,hapify-generators-graphql-resolvers,hapify-generators-graphql-resolvers-casl,hapify-generators-nestjs-services,hapify-prisma-nestjs-graphql-resolvers-generator,hapify-prisma-nestjs-graphql-resolvers-casl-generator,hapify-devkit,hapify-core,hapify-prisma-nestjs-services-generator"
nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
