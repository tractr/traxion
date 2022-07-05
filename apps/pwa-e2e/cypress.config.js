const Cypress = require('cypress');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

module.exports = Cypress.defineConfig({
  chromeWebSecurity: false,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  integrationFolder: './src/integration',
  pluginsFile: './src/plugins/index',
  modifyObstructiveCode: false,
  screenshotsFolder: '../../dist/cypress/apps/pwa-e2e/screenshots',
  supportFile: './src/support/index.ts',
  video: true,
  videosFolder: '../../dist/cypress/apps/pwa-e2e/videos',
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
