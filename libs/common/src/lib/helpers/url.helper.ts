/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
 */
export type JsonObject = { [Key in string]?: JsonValue };

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export type JsonArray = Array<JsonValue>;

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonObject
  | JsonArray;

/**
 * Type that describe an Url search parameter
 */
export type URLSearchParamsType =
  | string
  | string[][]
  | URLSearchParams
  // | Date
  | JsonObject
  | JsonObject[];

/**
 * Format an object to allow it to be used be used in an URLSearchParamsType
 *
 * @param params - The object to format into an url query string
 * @returns a formatted url query string
 */
export function formatUrlParams(params: JsonObject): Record<string, string> {
  return Object.entries(params).reduce((acc, [key, value]) => {
    // Ignore value if it is null or undefined
    if (value === undefined || value === null) return acc;
    let formatedValue: string;
    // String value is not modified
    if (typeof value === 'string') {
      formatedValue = value;
      // Boolean and number are turned into string
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      formatedValue = `${value}`;
      // Date is turn into an ISO string
    } else if (value instanceof Date) {
      formatedValue = value.toISOString();
      // Object is stringified
    } else if (typeof value === 'object' || Array.isArray(value)) {
      formatedValue = JSON.stringify(params[key]);
      acc[key] = JSON.stringify(params[key]);
      return acc;
      // This should never happen as all cases are handled before
    } else {
      throw new Error(
        `Value ${value} can be formated to an url parameter as its type is not handled`,
      );
    }
    // Add the formated key to the accumulator
    acc[key] = formatedValue;
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Format data that can be associated to url query parameters to a query string
 * that can be used in an url
 *
 * @param init
 * @returns
 */
export function getUrlSearchParams(init: URLSearchParamsType) {
  const params = init;
  if (typeof params === 'string' || params instanceof URLSearchParams) {
    return new URLSearchParams(params);
  }
  if (params !== null && typeof params === 'object' && !Array.isArray(params)) {
    return new URLSearchParams(formatUrlParams(params));
  }
  return new URLSearchParams(JSON.stringify(params));
}

/**
 * Build a correctly formated url from a base url,
 * url parameters and query parameters
 *
 * @param baseUrl - Base of the url (protocol and domain)
 * @param parameters - Url parameters
 * @param queryParams - Url query parameters
 * @returns a correctly formated url
 */
export function getUrl(
  baseUrl: URL,
  parameters = '',
  queryParams: URLSearchParamsType = {},
): URL {
  const url = new URL(
    `${baseUrl.pathname.replace(/\/$/, '')}${parameters}`,
    baseUrl,
  );
  const queries = getUrlSearchParams(queryParams);
  url.search = queries.toString();
  return url;
}
