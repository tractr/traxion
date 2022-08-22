/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { inspect } from 'util';

import { Chalk, Instance, Level } from 'chalk';
import safeStringify from 'fast-safe-stringify';
import { Format } from 'logform';
import { format } from 'winston';

export type NestLikeConsoleFormatOptions = {
  appName?: string;
  prettyPrint?: boolean;
  colors?: boolean | Level;
};

export function nestLikeConsoleFormat(
  options: NestLikeConsoleFormatOptions = {},
): Format {
  const { appName = 'Nest', prettyPrint = true, colors = true } = options;

  const levelOption = typeof colors !== 'boolean' ? colors : undefined;
  const chalkOptions = {
    level: colors === false ? 0 : levelOption,
  };

  const clc = new Instance(chalkOptions);
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
}
