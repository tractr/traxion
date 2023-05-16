#!/bin/bash
BASEDIR=$(dirname "$0")
PROJECTS="common"
PROJECTS="hapify-devkit,hapify-core,$PROJECTS"
PROJECTS="hapify-generators-nestjs-graphql-dtos,hapify-generators-nestjs-authorized-services,hapify-generators-nestjs-graphql-resolvers,hapify-generators-nestjs-authorized-graphql-resolvers,hapify-generator-nestjs-services,hapify-generators-casl,$PROJECTS"
PROJECTS="hapify-prisma-nestjs-graphql-dtos-generator,hapify-prisma-nestjs-authorized-services-generator,hapify-prisma-nestjs-graphql-resolvers-generator,hapify-prisma-nestjs-authorized-graphql-resolvers-generator,hapify-prisma-nestjs-services-generator,hapify-prisma-casl-generator,$PROJECTS"

nx run-many --target build --projects "${PROJECTS}"
node "${BASEDIR}/../local-install.mjs" --projects "${PROJECTS}"
