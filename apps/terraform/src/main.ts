import { App, RemoteBackend } from 'cdktf';

import { getTerraformConfiguration } from './configs';
import { MainStack } from './stacks';

let terraformEnvs;
try {
  terraformEnvs = getTerraformConfiguration();
} catch {
  process.exit(1);
}

const {
  PROJECT_CODE,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  TERRAFORM_REMOTE_BACKEND_HOST,
  TERRAFORM_REMOTE_BACKEND_ORG,
  TERRAFORM_REMOTE_BACKEND_TOKEN,
  TERRAFORM_REMOTE_BACKEND_WORKSPACE,
} = terraformEnvs;

console.info('Build terraform configuration file');
export const app = new App({ stackTraces: false });

console.info('Create main stack');
export const mainStack = new MainStack(
  app,
  'main',
  {
    name: PROJECT_CODE,
    awsProviderConfig: {
      region: AWS_REGION,
      accessKey: AWS_ACCESS_KEY_ID,
      secretKey: AWS_SECRET_ACCESS_KEY,
    },
  },
  terraformEnvs,
);

console.info('Create terraform remote backend');
export const remoteBackend = new RemoteBackend(mainStack, {
  hostname: TERRAFORM_REMOTE_BACKEND_HOST,
  organization: TERRAFORM_REMOTE_BACKEND_ORG,
  token: TERRAFORM_REMOTE_BACKEND_TOKEN,
  workspaces: {
    name: TERRAFORM_REMOTE_BACKEND_WORKSPACE,
  },
});

console.info('Convert the stack to static configuration');
app.synth();
