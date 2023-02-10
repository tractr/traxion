export interface SendEmail {
  from: string;
  to: string;
  subject?: string;
  templateId?: number;
  context?: Record<string, unknown>;
  text?: string;
  html?: string | boolean;
}
