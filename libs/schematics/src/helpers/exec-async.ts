import { exec } from 'child_process';
import { promisify } from 'util';

/**
 * Start npm run <cmd>
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function execAsync(cmd: string, options: Record<string, string>) {
  return promisify(exec)(cmd, options);
}
