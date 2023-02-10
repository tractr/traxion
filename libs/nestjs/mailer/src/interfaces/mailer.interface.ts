export type MailerModuleOptions = {
  apiKey?: string;
  apiSecret?: string;
  apiToken?: string;
  config?: MailerConfig;
};

export type MailerConfig = {
  host: string;
  version: string;
  output: string;
};
