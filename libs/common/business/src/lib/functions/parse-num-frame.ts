import { ParsedNumFrame } from '../types';

/**
 * Parse a num frame string to extract useful data
 *
 * ie. num frame before parsing => '82021_10_01_09_40_43_11'
 *
 * num frame after parsing => {
 *  cameraId: '8',
 *  frameNumber: '11',
 *  date: 2021-10-01T13:40:43.000Z
 * }
 *
 * The returned frameNumber is the actual frame in a second.
 * For example, frameNumber: '11' would be the 11th frame in a specific
 * second
 *
 * @param predictionLog - a prediction log num frame
 * @returns a parsed num frame object
 */
export function parseNumFrame(numFrame: string): ParsedNumFrame {
  const [cameraIdAndYear, month, day, hours, minutes, seconds, frameNumber] =
    numFrame.split('_');
  const year = cameraIdAndYear.slice(cameraIdAndYear.length - 4);
  const [cameraId] = cameraIdAndYear.split(year);
  const date = new Date(
    Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds),
  );

  return {
    cameraId,
    frameNumber,
    date,
  };
}
