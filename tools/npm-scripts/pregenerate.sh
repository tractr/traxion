#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="common,nestjs-bcrypt,nestjs-user,nestjs-authentication,nestjs-casl,nestjs-core,hapify-generators-graphql-resolvers,hapify-generators-graphql-resolvers-casl,hapify-generators-nestjs-services,hapify-prisma-nestjs-graphql-resolvers-generator,hapify-prisma-nestjs-graphql-resolvers-casl-generator,hapify-devkit,hapify-core,hapify-prisma-nestjs-services-generator,hapify-generators-casl-config,hapify-prisma-casl-generator"
nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
