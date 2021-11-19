import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Start npm run <cmd>
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function npmRun(cmd: string) {
  return execAsync(`npm run ${cmd}`);
}
