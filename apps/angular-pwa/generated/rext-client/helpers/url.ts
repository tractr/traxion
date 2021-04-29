export type URLSearchParamsType =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | Record<string, string | number | boolean | string[] | string[][] | Date>;

export function getUrlSearchParams(init: URLSearchParamsType) {
  return new URLSearchParams(
    init as string | string[][] | Record<string, string> | URLSearchParams,
  );
}

export function getUrl(
  apiUrl: URL,
  appendUrl = '',
  params: URLSearchParamsType = {},
): URL {
  const url = new URL(
    `${apiUrl.pathname.replace(/\/$/, '')}${appendUrl}`,
    apiUrl,
  );
  const queries = getUrlSearchParams(params);
  url.search = queries.toString();
  return url;
}

