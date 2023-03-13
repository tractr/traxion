# Example api prisma

- Run the generation with `npx nx run examples-api-prisma:prisma-generate`.
- Start the docker-compose `docker-compose up -d`.
- Push the db schema `npx nx run examples-api-prisma:prisma-push`.
- Start the api `npx nx run examples-api-prisma:serve`.
- Open the playground `http://localhost:3000/graphql`.
- You can add data in the db with prisma studio: `npx nx run examples-api-prisma:prisma-studio`.
