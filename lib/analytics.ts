declare global {
  interface Window {
    plausible?: (event: string, options?: {props?: Record<string, unknown>}) => void;
  }
}

export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    try {
      window.plausible(name, data ? {props: data} : undefined);
    } catch {
      // ignore
    }
  }
}

