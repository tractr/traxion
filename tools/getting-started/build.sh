#!/usr/bin/env bash

set -e
set -o pipefail

BASE_DIR="${PWD}";
GS_DIR="${BASE_DIR}/tools/getting-started"
NPD_DIR="${GS_DIR}/nestjs-prisma-demo"

# ----------------------------------
# Pre-requisites
# Clean previous build
rm -rf "${GS_DIR}"/nestjs-prisma-demo

# Install global dependencies
npm install -g @nestjs/cli

# Build current repository
npm run build

# Get to working dir
cd "${GS_DIR}" || exit 1

# ----------------------------------
# Step 1: Initialize a NestJS application
# Create a new NestJS project
nest new nestjs-prisma-demo --package-manager npm --language TypeScript

# Move into the created project directory
cd nestjs-prisma-demo || exit 1

# ----------------------------------
# Step 2: Integrate Prisma into the NestJS project
# Install Prisma
npm install prisma --save-dev

# ----------------------------------
# Step 3: Set up Prisma
# Initialize Prisma
npx prisma init

# ----------------------------------
# Step 4: Set up a PostgreSQL database
# Copy .env file
cat "${GS_DIR}"/files/app.env > "${NPD_DIR}"/.env

# ----------------------------------
# Step 5: Install Prisma generator libraries
npm i --save \
  @nestjs/apollo \
  @nestjs/graphql \
  @paljs/plugins \
  @casl/ability \
  @casl/prisma \
  class-transformer

# Copy local packages to node_modules to ensure that the latest version is used
node "${BASE_DIR}"/tools/local-install.mjs

# ----------------------------------
# Step 6: Define a Prisma schema
# Append the schema.prisma file into the Prisma directory
cat "${GS_DIR}"/files/schema.prisma > "${NPD_DIR}"/prisma/schema.prisma
cat "${GS_DIR}"/files/seed.ts > "${NPD_DIR}"/prisma/seed.ts

# ----------------------------------
# Step 7: Generate NestJS services and DTOs
# Generate NestJS services and DTOs
npx prisma generate

# ----------------------------------
# Step 8: Set up the database using Prisma
# Set up the database using Prisma
npx prisma db push --force-reset
npx ts-node -r tsconfig-paths/register --project "${NPD_DIR}"/tsconfig.json "${NPD_DIR}"/prisma/seed.ts

# ----------------------------------
# Step 9: Create NestJS modules
rm "${NPD_DIR}"/src/app.controller.ts "${NPD_DIR}"/src/app.service.ts "${NPD_DIR}"/src/app.controller.spec.ts
cat "${GS_DIR}"/files/app.module.ts > "${NPD_DIR}"/src/app.module.ts


