# Our brand new shiny backend =)

## Let's start

In order to run the backend properly, there is some few initialisation steps that you
must follow:

- Install the dependencies: run `npm i --` at the root of the repository.
- Move in the apps/test-backend-start folder: `cd apps/test-backend-starter`.
- Generate hapify configuration: run `npm run hpf:generate:config`.
- Generate boilerplate code: run `npm run hpf:generate`.
- Merge the prisma schema: `npm run prisma:merge-schema`.
- Format the prisma schema: `npm run prisma:format`.
- Generate the prisma client: `npm run prisma:generate`.
- Start the docker compose that contains the database container: `docker-compose up -d`.
- Finally you can run the backend: `npm run start:dev`.


