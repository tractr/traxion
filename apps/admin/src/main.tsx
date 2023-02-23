import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';
import { getConfig } from './environments/environment';

import { fetchConfiguration } from '@trxn/client-config';

const ADMIN_CONFIGURATION_SESSION_STORAGE = 'ADMIN_CONFIGURATION';

fetchConfiguration({
  sessionStorageKey: ADMIN_CONFIGURATION_SESSION_STORAGE,
  getConfig,
})
  .then((config) => {
    const container = document.getElementById('root') as Element;
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <App config={config} />
      </StrictMode>,
    );
  })
  .catch((err) => console.error(err));
