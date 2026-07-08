import { useState, useEffect } from "react";

/**
 * Reads CRM deep-link params from the URL once on mount:
 * - `?new=1`   → open the page's create modal
 * - `?focus=<id>` → scroll to and highlight the matching record
 * Uses window.location (not useSearchParams) to avoid a Suspense boundary.
 */
export function useCrmDeepLink() {
  const [state, setState] = useState<{ openNew: boolean; focusId: string | null }>({
    openNew: false,
    focusId: null,
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setState({ openNew: params.get("new") === "1", focusId: params.get("focus") });
  }, []);

  return state;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
