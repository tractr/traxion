import { AppConfig } from '../interfaces';

import { ReactAdmin } from '@trxn/generated-react-admin';

export function App({ config }: { config: AppConfig }) {
  return <ReactAdmin apiUrl={config.api.uri} />;
}

export default App;
