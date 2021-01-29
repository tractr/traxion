# Our brand new shiny backend =)

## Stack

- Nestjs framework
- Prisma ORM
- Swagger for automatic REST documentation
- Jest and Supertest for unit and end-to-end tests

## Installation

- Clone the repository then run `yarn`
- Move in `packages/hapify-user-boilerplate`
- Run `yarn run generate`. It will run hapify generation, build prisma schema,
generate prisma client and migrate the local database with prisma migration

## Questions

- [] Où gérer les erreurs comme les conflits pour les champs uniques (service ou couche réseau)? **Dans les services**
- [x] Utiliser le plugin du nest cli pour s'économiser les decorateurs graphql? **Oui**
- [x] Dans les modules, créer un dossier 'rest' et un dossier 'graphql'? **Passer dossier models dans resolver**
- [x] Utiliser la même classe de DTO pour le rest et le graphql? **Oui**
- [] modules: comment on gére les relations? Une entité, un module? **un module par entité**
- [x] Comment gérer les noms de classe conflictuels: Prisma.User et GraphqlModel.User ? ** Aliaser les classes de Prisma (exemple: User as PrismaUser)**
- [] graphql: comment on gére les relations? **Dataloader**
- [] ajouter les unit tests et endToEnd tests? **Mais oui!!**
- [] génération: on génere tous les fichiers dans un dossier du node_modules ? et on les étend? Dans ce cas, où est ce qu'on définit les décorateurs? **Dans les fichiers générés**
- [] DTO et gestion de droits: utilisation de class-validator group? **À voir plus tard**
- [] Utiliser le champs 'note' de hapify pour générer la description des champs ? **Oui**
