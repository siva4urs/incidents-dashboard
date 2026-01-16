import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('max-width: 600px'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Minimal matchMedia mock for components using it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => {
    let matches = false;
    const listeners = new Set<(e: MediaQueryListEvent) => void>();

    const mql: MediaQueryList = {
      media: query,
      matches,
      onchange: null,
      addListener: (cb) => listeners.add(cb),
      removeListener: (cb) => listeners.delete(cb),
      addEventListener: (_, cb) => listeners.add(cb as (e: MediaQueryListEvent) => void),
      removeEventListener: (_, cb) => listeners.delete(cb as (e: MediaQueryListEvent) => void),
      dispatchEvent: (event) => {
        for (const cb of listeners) cb(event as MediaQueryListEvent);
        return true;
      }
    };

    // helper for tests to toggle matching
    (mql as any).__setMatches = (next: boolean) => {
      matches = next;
      (mql as any).matches = next;
      mql.dispatchEvent(new Event('change') as any);
    };

    return mql;
  }
});
