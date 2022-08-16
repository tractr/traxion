import { AppConfig } from '../interfaces';

import { ReactAdmin } from '@tractr/generated-react-admin';

export function App({ config }: { config: AppConfig }) {
  return <ReactAdmin apiUrl={config.api.uri} />;
}

export default App;
