import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app';
import { fetchConfiguration } from './config';
import { getConfig } from './environments/environment';

fetchConfiguration({ getConfig })
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
