import { getTerraformConfiguration } from './configs';
import { MainStack } from './stacks';

import { App, RemoteBackend } from 'cdktf';

let terraformEnvs;
try {
  terraformEnvs = getTerraformConfiguration();
} catch {
  console.error('You are missing environment variables for Terraform');
  process.exit(1);
}

const {
  PROJECT_CODE,
  AWS_REGION,
  TERRAFORM_REMOTE_BACKEND_HOST,
  TERRAFORM_REMOTE_BACKEND_ORG,
  TERRAFORM_REMOTE_BACKEND_WORKSPACE,
} = terraformEnvs;

console.info('Build terraform configuration file');
export const app = new App({ stackTraces: false });

console.info('Create main stack');
export const mainStack = new MainStack(
  app,
  'main',
  { name: PROJECT_CODE, awsProviderConfig: { region: AWS_REGION } },
  terraformEnvs,
);

console.info('Create terraform remote backend');
export const remoteBackend = new RemoteBackend(mainStack, {
  hostname: TERRAFORM_REMOTE_BACKEND_HOST,
  organization: TERRAFORM_REMOTE_BACKEND_ORG,
  workspaces: {
    name: TERRAFORM_REMOTE_BACKEND_WORKSPACE,
  },
});

console.info('Convert the stack to static configuration');
app.synth();
