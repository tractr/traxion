/* eslint-disable @typescript-eslint/no-explicit-any */
import * as queryString from 'query-string';

/**
 * Format a query parameters object into a query parameters string
 * @param queryParams - Object to format
 * @returns a query parameters string
 */
export function formatQueryParameters(queryParams: Record<string, any>) {
  const formattedQueryParams = Object.entries(queryParams).reduce(
    (acc, [key, value]) => {
      // for values of type array, items that are of type object are stringified
      if (Array.isArray(value)) {
        acc[key] = value.map((item) =>
          typeof item === 'object' ? JSON.stringify(item) : item,
        );

        // Dates must be stringified
      } else if (value instanceof Date) {
        acc[key] = value.toISOString();

        // Objects must be stringified
      } else if (typeof value === 'object') {
        acc[key] = JSON.stringify(value);

        // Other types of values does no require any process
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {} as Record<string, any>,
  );

  return queryString.stringify(formattedQueryParams, {
    arrayFormat: 'bracket',
    skipNull: false,
    skipEmptyString: true,
  });
}

/**
 * Build a correctly formatted url from a base url,
 * url parameters and query parameters
 *
 * @param baseUrl - Base of the url (protocol and domain)
 * @param parameters - Url parameters
 * @param queryParams - Url query parameters
 * @returns a correctly formatted url
 */
export function getUrl(
  baseUrl: URL,
  parameters = '',
  queryParams: Record<string, any> = {},
): URL {
  const url = new URL(
    `${baseUrl.pathname.replace(/\/$/, '')}${parameters}`,
    baseUrl,
  );
  url.search = formatQueryParameters(queryParams);
  return url;
}
