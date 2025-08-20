import { useCallback, useRef } from "react";

type DebouncedFunction = (...args: any[]) => Promise<void> | void;

export function useDebounce(delay: number = 1000) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (fn: DebouncedFunction) => {
      return async (...args: any[]) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        return new Promise<void>((resolve) => {
          timeoutRef.current = setTimeout(async () => {
            await fn(...args);
            resolve();
          }, delay);
        });
      };
    },
    [delay]
  );

  return debounce;
}
