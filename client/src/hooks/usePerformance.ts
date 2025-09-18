import { useCallback, useEffect, useMemo, useRef } from 'react';

// Debounce hook for search and filter operations
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T,
    [callback, delay]
  );
}

// Throttle hook for scroll and resize events
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}

// Memoized filter and sort operations
export function useFilteredAndSortedData<T>(
  data: T[],
  filterFn: (item: T) => boolean,
  sortFn: (a: T, b: T) => number,
  dependencies: any[]
) {
  return useMemo(() => {
    return data.filter(filterFn).sort(sortFn);
  }, [data, ...dependencies]);
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  renderCount.current++;

  return useCallback(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (renderTime > 16) { // More than one frame (60fps)
      console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms (${renderCount.current} renders)`);
    }
    
    startTime.current = performance.now();
  }, [componentName]);
}

// Web Vitals-lite logging
export function useWebVitals() {
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.info('[perf] LCP', (entry as any).startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.info('[perf] CLS', (entry as any).value);
        }
      }
    });
    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true } as any);
      observer.observe({ type: 'layout-shift', buffered: true } as any);
    } catch {}
    return () => observer.disconnect();
  }, []);
}
