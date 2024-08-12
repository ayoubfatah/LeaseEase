export function debounce<T>(
  func: (this: T, ...args: any[]) => void,
  delay: number
) {
  let timeoutId: any;
  return function (this: T, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
