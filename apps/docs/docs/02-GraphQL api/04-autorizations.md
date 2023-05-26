---
id: autorizations
title: Autorizations
sidebar_label: Autorizations
---

La couche d'autorisation de de traxion est centralisée dans un module spécifique `NestjsAuthorizationService`. Ce module reprend la même interface que la couche de business. Elle permet de valider via le parametrage de casl que l'utilisateur courant a bien le droit de manipuler cette entitée. Chaque methode appel dans son traitement les methodes de la couche de business et rajoute autour cette autorisation.

Pour réaliser cette autorisation traxion manipule en son sein seulement une ability (objet créé via casl). Ainsi la configuration de casl peut se faire a l'exterieur de la génération.

La couche de service prend en parametre cette ability et la couche de graphql récupère cette ability dans le context req graphql. Ainsi lors de la configuration de traxion pour permettre l'utilisation de casl il faut rajouter en amont de la chaine (dans un guard global) la création de cette ability et la mettre dans le context Graphql.

## Configuration du context GraphQL

Lors de l'utilisation des generateurs individuels (tous sauf `traxion-prisma-generator`) il faut paramétrer le context de votre serveur Graphql. Par exemple:

```ts
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      ...
      context: ({ req, res }) => ({ req, res }),
    })
  ]
})
...
```

## Ajout d'un middleware nestjs permettant la gestion des utilisateurs et des abilitiés

Vous devez par la suite configurer la gestion des utilisateurs et des abilités via des guards globals. Pour cela vous pouvez utiliser le token de provider de nestjs `APP_GUARD` pour configurer au niveau de votre application un guard de check d'utilisateur chainer avec un guard de gestion des droits Casl. Traxion vous fournit deux guards existants vous permettant d'utiliser directement les resolvers sans configurations.

Note: le guard d'utilisateur doit authentifier l'utilisateur contre votre base de données et doit impérativement hydrater votre utilisateurs avec le `UserSelectOwnershipIds` généré. Ce select va permettre par la suite a casl de vérifier que votre utilisateur own la data et donc qu'il a bien les droits nécessaires a sa manipulation.

Note: les guards fournit par traxion regarde si le décorateur `@Public()` de traxion est utilisé ou non et laisse passer la requête si jamais ce décorateur est utilisé (dans ce cas la c'est les droits configuré dans publicPermissions qui sont utilisés). Il est préférable d'authentifier toutes les routes et de whitelister les routes public que l'inverse.

Voici un exemple de configuration des guards fournit par traxion:

```ts
@Module({
  imports: [
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect,
      jwtModuleOptions: {
        secret: process.env.JWT_SECRET || 'secret',
      },
    }),
    CaslModule.register({
      getRoles,
      rolePermissions,
      publicPermissions,
    }),
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
})
...
```

Ici le `customSelect` est le user select qui sera utilisé par le guard `JwtGlobalAuthGuard` et les callback `rolePermissions` et `publicPermissions` sont les fonctions qui permettent de configurer les autorisations casl.

Traxion vous met a disposition des modules de helpers permettant d'authentifier et de configurer casl facilement.
