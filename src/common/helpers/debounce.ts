let time!: NodeJS.Timeout;

export function debounceEvent<TArgs = unknown, TReturn = unknown>(
  fn: (...args: TArgs[]) => TReturn | Promise<TReturn>,
  wait = 1000
) {
  return (...args: TArgs[]): void => {
    clearTimeout(time);
    time = setTimeout(() => fn(...args), wait);
  };
}
