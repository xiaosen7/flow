export function getUrl(options: {
  url: string;
  searchParams: Record<string, string>;
}) {
  const { url, searchParams } = options;
  const newSearchParams = new URLSearchParams(searchParams);
  const urlObj = new URL(url);

  newSearchParams.forEach((value, key) => {
    urlObj.searchParams.set(key, value);
  });

  return urlObj.toString();
}
