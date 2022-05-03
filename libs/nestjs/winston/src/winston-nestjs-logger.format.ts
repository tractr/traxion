/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { inspect } from 'util';

import { Chalk, Instance } from 'chalk';
import safeStringify from 'fast-safe-stringify';
import { format } from 'winston';

export type NestLikeConsoleFormatOptions = {
  appName?: string;
  prettyPrint?: boolean;
  colors?: boolean;
};

export const nestLikeConsoleFormat = (
  options: NestLikeConsoleFormatOptions = {},
) => {
  const { appName = 'Nest', prettyPrint = true, colors = true } = options;

  const clc = new Instance(!colors ? { level: 0 } : {});
  const nestLikeColorScheme: Record<string, Chalk> = {
    info: clc.greenBright,
    error: clc.red,
    warn: clc.yellow,
    debug: clc.magentaBright,
    verbose: clc.cyanBright,
  };

  return format.printf(({ context, level, timestamp, message, ...meta }) => {
    const color =
      nestLikeColorScheme[level] || ((text: string): string => text);

    const stringifiedMeta = safeStringify(meta);
    const formattedMeta = prettyPrint
      ? inspect(JSON.parse(stringifiedMeta), {
          colors: !!colors,
          depth: null,
        })
      : stringifiedMeta;

    const name = color(`[${appName}]`);
    const levelLabel = level.charAt(0).toUpperCase() + level.slice(1);
    const timeLabel = typeof timestamp !== 'undefined' ? `${timestamp} ` : '';
    const contextLabel =
      typeof context !== 'undefined' ? `${clc.yellow(`[${context}]`)} ` : '';

    return `${name} ${levelLabel}\t${timeLabel}${contextLabel}${color(
      message,
    )} - ${formattedMeta}`;
  });
};
