import { ClientParams } from 'node-mailjet/declarations/client/Client';

export type MailjetModuleOptions = ClientParams & {
  sandboxMode?: boolean;
};
