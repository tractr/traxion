/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { inspect } from 'util';

import clc from 'chalk';
import safeStringify from 'fast-safe-stringify';
import { format } from 'winston';

export type NestLikeConsoleFormatOptions = {
  prettyPrint?: boolean;
};

export const nestLikeColorScheme: Record<string, clc.Chalk> = {
  info: clc.greenBright,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
};

export const nestLikeConsoleFormat = (
  appName = 'Nest',
  options: NestLikeConsoleFormatOptions = {},
) =>
  format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
    let time;
    if (typeof timestamp !== 'undefined') {
      // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
      // that is not a valid date string will throw, just ignore it (it will be printed as-is).
      try {
        if (timestamp === new Date(timestamp).toISOString()) {
          time = new Date(timestamp).toLocaleString();
        }
      } catch (error) {
        // eslint-disable-next-line no-empty
      }
    }

    const color =
      nestLikeColorScheme[level] || ((text: string): string => text);

    const stringifiedMeta = safeStringify(meta);
    const formattedMeta = options?.prettyPrint
      ? inspect(JSON.parse(stringifiedMeta), { colors: true, depth: null })
      : stringifiedMeta;

    return (
      `${color(`[${appName}]`)} ` +
      `${clc.yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t${
        typeof time !== 'undefined' ? `${time} ` : ''
      }${
        typeof context !== 'undefined' ? `${clc.yellow(`[${context}]`)} ` : ''
      }${color(message)} - ` +
      `${formattedMeta}${typeof ms !== 'undefined' ? ` ${clc.yellow(ms)}` : ''}`
    );
  });
