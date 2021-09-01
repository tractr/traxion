import { exec } from './exec';

/**
 * Start npm run <cmd>
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function npmRun(cmd: string) {
  return exec(`npm run ${cmd}`);
}
