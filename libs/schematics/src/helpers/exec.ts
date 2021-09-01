import { exec as execCP } from 'child_process';

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export function exec(cmd: string) {
  return new Promise((resolve, reject) => {
    execCP(cmd, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      return resolve(stdout || stderr);
    });
  });
}
