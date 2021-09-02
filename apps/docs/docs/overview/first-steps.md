---
id: first-steps
title: First steps to start working with the Stack
sidebar_label: First Steps
---

# Quick Start
This article will help you quickly start the PWA and API to begin working on it.

- After cloning the source code on your computer, go to the repository root
- Install all dependencies by running `npm install`
- Run `docker-compose up -d`. You may need to delete docker volumes for this command to work
- Sync your local database with its prisma schema, run `npm run prisma:db:push` and to populate the database run `npm run prisma:db:seed`
- Start the api by running `nx run api:serve`
- In a new terminal, start the PWA by running `nx run pwa:serve`, by default you can access the PWA at http://localhost:4200
