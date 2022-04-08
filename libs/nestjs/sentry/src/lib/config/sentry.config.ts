import { SentryDefaultOptions } from '../interfaces/sentry-module.interface';

export const SENTRY_DEFAULT_OPTIONS: SentryDefaultOptions = {
  debug: true,
  initialScope: {
    tags: { service: 'api' },
  },
  requestDefaultAge: 2000,
  pushGlobalBreadcrumbsWithPerRequestBreadcrumbs: true,
};
