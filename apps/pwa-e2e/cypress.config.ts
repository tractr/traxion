import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

import setupNodeEvents from './src/plugins/index';

const cypressJsonConfig = {
  chromeWebSecurity: false,
  fileServerFolder: '.',
  fixturesFolder: './src/fixtures',
  screenshotsFolder: '../../dist/cypress/apps/pwa-e2e/screenshots',
  video: true,
  videosFolder: '../../dist/cypress/apps/pwa-e2e/videos',
  specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'src/support/e2e.ts',
};

export default defineConfig({
  projectId: '53k5zj',
  e2e: {
    ...nxE2EPreset(__filename),
    ...cypressJsonConfig,
    setupNodeEvents,
  },
});
