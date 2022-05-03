import { Breadcrumb as BaseBreadcrumb, Options } from '@sentry/types';

export type SentryCustomOptions = {
  requestDefaultAge: number; // Default age of a request if no timestamp is defined (in milliseconds)
  pushGlobalBreadcrumbsWithPerRequestBreadcrumbs: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type SentryDefaultOptions = Pick<Options, 'debug' | 'initialScope'> &
  SentryCustomOptions;

export type SentryPublicOptions = Options & Partial<SentryCustomOptions>;

export type SentryModuleOptions = SentryPublicOptions & SentryDefaultOptions;

export type BreadcrumbType =
  | 'default'
  | 'debug'
  | 'error'
  | 'navigation'
  | 'http'
  | 'info'
  | 'query'
  | 'user';
export interface Breadcrumb extends BaseBreadcrumb {
  type?: BreadcrumbType;
}

export interface SentryFilterFunction {
  (exception: Error): boolean;
}
export interface SentryInterceptorOptions {
  filters?: SentryFilterFunction[];
}
