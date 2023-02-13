export interface SendEmail {
  from: string;
  to: string | string[];
  subject?: string;
  context?: Record<string, unknown>;
  text?: string;
  html?: string;
}

export interface MailerClient {
  send(params: SendEmail): Promise<unknown>;
}
