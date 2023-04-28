#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="common"
PROJECTS="hapify-devkit,hapify-core,$PROJECTS"
PROJECTS="nestjs-bcrypt,nestjs-user,nestjs-authentication,nestjs-casl,nestjs-core,$PROJECTS"
PROJECTS="hapify-generators-graphql-resolvers,hapify-generators-graphql-resolvers-casl,hapify-generators-nestjs-services,hapify-generators-casl-config,$PROJECTS"
PROJECTS="hapify-prisma-nestjs-graphql-resolvers-generator,hapify-prisma-nestjs-graphql-resolvers-casl-generator,hapify-prisma-nestjs-services-generator,hapify-prisma-casl-generator,$PROJECTS"

nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
