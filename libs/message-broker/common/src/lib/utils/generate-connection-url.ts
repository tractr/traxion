import { MessageBrokerConfiguration } from '../dtos';

export function generateConnectionUrl({
  domain,
  port,
  protocol,
  user,
  password,
}: MessageBrokerConfiguration) {
  return `${protocol}://${user}:${password}@${domain}:${port}`;
}
