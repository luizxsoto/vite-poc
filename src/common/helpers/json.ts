export function safetyJSONParse<TReturn>(
  value: string | null
): TReturn | undefined {
  if (!value) return undefined;

  try {
    const parsedJSON = JSON.parse(value) as TReturn;

    return parsedJSON;
  } catch {
    return undefined;
  }
}
