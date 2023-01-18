import { logger, Tree } from '@nrwl/devkit';

export type LoggerLevel = 'info' | 'error' | 'debug' | 'warn' | 'log' | 'fatal';

function log(level: LoggerLevel, isVerbose = true) {
  return (message: string) => {
    if (isVerbose) logger[level](`- ${message}`);
    return isVerbose
      ? () => {
          logger[level](`✔ ${message}`);
        }
      : () => undefined;
  };
}

export function getLogger(
  tree: Tree,
): Record<LoggerLevel, (message: string) => () => void> {
  const { isVerbose } = tree as unknown as { isVerbose: boolean };

  return {
    info: log('info'),
    warn: log('warn'),
    error: log('error'),
    debug: log('debug', isVerbose),
    log: log('log', isVerbose),
    fatal: log('fatal', isVerbose),
  };
}
