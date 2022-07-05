// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    seed(forceReset?: boolean): Cypress.Chainable<Cypress.Exec>;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.log('Command: Login', email, password);
  cy.request('POST', '/api/login', { email, password });
});

Cypress.Commands.add('seed', (forceReset = true) => {
  cy.log('Command: database seed');
  const env = { DATABASE_URL: Cypress.env('DATABASE_URL') };
  return cy
    .exec(
      `npx prisma db push --skip-generate --schema ../../libs/generated/prisma/prisma/schema.prisma${
        forceReset ? ' --force-reset' : ''
      }`,
      {
        env,
      },
    )
    .exec(
      'ts-node -r tsconfig-paths/register --project ../../libs/generated/prisma/tsconfig.lib.json ../../libs/generated/prisma/prisma/seed.ts',
      { env },
    );
});
