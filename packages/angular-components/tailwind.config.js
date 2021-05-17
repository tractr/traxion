import { guessProductionMode } from "@ngneat/tailwind";

export const prefix = '';
export const purge = {
  enabled: guessProductionMode(),
  content: [
    './src/**/*.{html,ts}',
  ]
};
export const darkMode = 'class';
export const theme = {
  extend: {},
};
export const variants = {
  extend: {},
};
export const plugins = [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')];
